const fs = require('fs');
const https = require('https');
const path = require('path');

const WEBFLOW_API_TOKEN = '2fa739d7456e30751df41d402e19f154ce6994ea1a32890e1a7aed5fc53f16e6';
const COLLECTION_ID = '69ada6bd9c227d57ec0a1466';

const showsDir = path.join(__dirname, 'public', 'shows');

if (!fs.existsSync(showsDir)) {
    fs.mkdirSync(showsDir, { recursive: true });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const writeStream = fs.createWriteStream(filepath);
                res.pipe(writeStream);
                writeStream.on('finish', () => {
                    writeStream.close();
                    resolve();
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                https.get(res.headers.location, (redirectRes) => {
                    if (redirectRes.statusCode === 200) {
                        const writeStream = fs.createWriteStream(filepath);
                        redirectRes.pipe(writeStream);
                        writeStream.on('finish', () => {
                            writeStream.close();
                            resolve();
                        });
                    } else {
                        reject(new Error(`Failed to download redirected image: ${res.headers.location}, status: ${redirectRes.statusCode}`));
                    }
                }).on('error', reject);
            } else {
                reject(new Error(`Failed to download image: ${url}, status: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function run() {
    try {
        console.log('Fetching Webflow data...');
        const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
            headers: {
                Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
                Accept: 'application/json',
            }
        });

        const data = await res.json();

        for (const item of data.items) {
            const slug = item.fieldData.slug;
            const originalProxyUrl = item.fieldData.imageurl;

            if (!originalProxyUrl) {
                console.log(`Skipping ${slug} - No image URL found.`);
                continue;
            }

            try {
                // Extract the raw URL from the Next.js target param
                const u = new URL(originalProxyUrl);
                const rawUrl = u.searchParams.get('url');

                if (rawUrl) {
                    const filepath = path.join(showsDir, `${slug}.jpg`);
                    console.log(`Downloading ${slug}...`);
                    await downloadImage(rawUrl, filepath);
                    console.log(`✅ Saved ${slug}.jpg`);
                } else {
                    console.log(`❌ Could not extract URL for ${slug}`);
                }
            } catch (e) {
                console.log(`❌ Error processing ${slug}: ${e.message}`);
            }
        }
        console.log('Finished downloading all available images.');
    } catch (e) {
        console.error('Fatal error:', e);
    }
}

run();
