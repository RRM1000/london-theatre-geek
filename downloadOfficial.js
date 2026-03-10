const fs = require('fs');
const https = require('https');
const path = require('path');

const showsDir = path.join(__dirname, 'public', 'shows');
if (!fs.existsSync(showsDir)) fs.mkdirSync(showsDir, { recursive: true });

// We'll map Webflow slugs to precise search terms that will yield good results on an open image search (like Wikimedia/TMDB)
// Or just hardcode a known working high-quality image URL for each primary show to ensure perfection.
const showDirectMap = {
    "hamilton": "https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2ZlLTk0NTEtZmRmYmRjYmY4N2E3XkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_FMjpg_UX1000_.jpg",
    "six-the-musical": "https://m.media-amazon.com/images/M/MV5BNWZlNzc1Y2ItYWRlMy00MmZkLTkyMGEtMjMxODM5YTNmNWRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    "wicked": "https://m.media-amazon.com/images/M/MV5BZWU0YzhlOGMtODcxMi00MjVjLWFjMTEtOTgyYWQwOGEzM2EzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    "the-lion-king": "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3OS00MzMzLWE4ZTEtZjkzZGEyNDJiMzIwXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_FMjpg_UX1000_.jpg",
    "mamma-mia": "https://m.media-amazon.com/images/M/MV5BMDA4NjQzN2ItMzgxNC00MDNlLWE3NWEtYzlhMGQ1MTllMDI4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
    "les-miserables": "https://m.media-amazon.com/images/M/MV5BMTQ4NDI3NDg4M15BMl5BanBnXkFtZTcwMjY5OTI1OA@@._V1_FMjpg_UX1000_.jpg",
    "the-phantom-of-the-opera": "https://m.media-amazon.com/images/M/MV5BMjA5OTE4NzMxMF5BMl5BanBnXkFtZTcwNTIxODQ4OA@@._V1_FMjpg_UX1000_.jpg",
    "matilda-the-musical": "https://m.media-amazon.com/images/M/MV5BMjA4MDk3MDMtNzViNy00YWNlLThhMGUtYWM4Zjg2MDY2ODU4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
    "cabaret": "https://m.media-amazon.com/images/M/MV5BMTgzODI2NjQ0Ml5BMl5BanBnXkFtZTcwMzk4OTIyMQ@@._V1_FMjpg_UX1000_.jpg"
};

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 200) {
                const writeStream = fs.createWriteStream(filepath);
                res.pipe(writeStream);
                writeStream.on('finish', () => { writeStream.close(); resolve(); });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (redirectRes) => {
                    if (redirectRes.statusCode === 200) {
                        const writeStream = fs.createWriteStream(filepath);
                        redirectRes.pipe(writeStream);
                        writeStream.on('finish', () => { writeStream.close(); resolve(); });
                    } else reject(new Error(`Redirect failed: ${redirectRes.statusCode}`));
                }).on('error', reject);
            } else reject(new Error(`Status: ${res.statusCode}`));
        }).on('error', reject);
    });
}

async function run() {
    console.log('Downloading reliable official posters...');
    for (const [slug, url] of Object.entries(showDirectMap)) {
        const filepath = path.join(showsDir, `${slug}.jpg`);
        try {
            await downloadImage(url, filepath);
            console.log(`✅ Saved ${slug}.jpg`);
        } catch (e) {
            console.log(`❌ Failed ${slug}: ${e.message}`);
        }
    }
}

run();
