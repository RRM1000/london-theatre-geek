const fs = require('fs');
const https = require('https');
const path = require('path');

const showsDir = path.join(__dirname, 'public', 'shows');
if (!fs.existsSync(showsDir)) fs.mkdirSync(showsDir, { recursive: true });

const showsToDownload = [
    "hamilton", "six-the-musical", "wicked", "the-lion-king",
    "mamma-mia", "les-miserables", "the-phantom-of-the-opera",
    "matilda-the-musical", "the-play-that-goes-wrong", "cabaret",
    "harry-potter-and-the-cursed-child", "back-to-the-future",
    "the-book-of-mormon", "tina-the-tina-turner-musical", "moulin-rouge"
];

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 200) {
                const writeStream = fs.createWriteStream(filepath);
                res.pipe(writeStream);
                writeStream.on('finish', () => { writeStream.close(); resolve(); });
            } else {
                reject(new Error(`Status: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

function searchLondonTheatre(slug) {
    return new Promise((resolve) => {
        const searchUrl = `https://www.londontheatre.co.uk/api/search?q=${slug.replace(/-/g, ' ')}`;
        https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json[0] && json[0].image) {
                        resolve(json[0].image);
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    console.log('Starting image scrape from LondonTheatre...');
    for (const slug of showsToDownload) {
        console.log(`\nSearching for ${slug}...`);
        const imgPath = await searchLondonTheatre(slug);

        if (imgPath) {
            // Londontheatre images come as relative paths or ctfassets
            let fullUrl = imgPath;
            if (imgPath.startsWith('//')) fullUrl = 'https:' + imgPath;
            else if (imgPath.startsWith('/')) fullUrl = 'https://www.londontheatre.co.uk' + imgPath;

            console.log(`Found: ${fullUrl}`);
            const filepath = path.join(showsDir, `${slug}.jpg`);

            try {
                await downloadImage(fullUrl, filepath);
                console.log(`✅ Saved ${slug}.jpg`);
            } catch (e) {
                console.log(`❌ Failed to download ${slug}: ${e.message}`);
            }
        } else {
            console.log(`❌ No image found in search for ${slug}`);
        }

        // Politeness delay
        await new Promise(r => setTimeout(r, 1000));
    }
}

run();
