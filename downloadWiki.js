const fs = require('fs');
const https = require('https');
const path = require('path');

const showsDir = path.join(__dirname, 'public', 'shows');
if (!fs.existsSync(showsDir)) fs.mkdirSync(showsDir, { recursive: true });

const showsWikiMap = {
    "hamilton": "Hamilton_(musical)",
    "six-the-musical": "Six_(musical)",
    "wicked": "Wicked_(musical)",
    "the-lion-king": "The_Lion_King_(musical)",
    "mamma-mia": "Mamma_Mia!",
    "les-miserables": "Les_Misérables_(musical)",
    "the-phantom-of-the-opera": "The_Phantom_of_the_Opera_(1986_musical)",
    "matilda-the-musical": "Matilda_the_Musical",
    "the-play-that-goes-wrong": "The_Play_That_Goes_Wrong",
    "cabaret": "Cabaret_(musical)",
    "harry-potter-and-the-cursed-child": "Harry_Potter_and_the_Cursed_Child",
    "back-to-the-future": "Back_to_the_Future:_The_Musical",
    "the-book-of-mormon": "The_Book_of_Mormon_(musical)",
    "tina-the-tina-turner-musical": "Tina_(musical)",
    "moulin-rouge": "Moulin_Rouge!_(musical)"
};

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'LondonTheatreGeekBot/1.0 (info@example.com)' } }, (res) => {
            if (res.statusCode === 200) {
                const writeStream = fs.createWriteStream(filepath);
                res.pipe(writeStream);
                writeStream.on('finish', () => { writeStream.close(); resolve(); });
            } else reject(new Error(`Status: ${res.statusCode}`));
        }).on('error', reject);
    });
}

function getWikiThumbnail(title) {
    return new Promise((resolve) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`;
        https.get(url, { headers: { 'User-Agent': 'LondonTheatreGeekBot/1.0 (info@example.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
                        resolve(pages[pageId].thumbnail.source);
                    } else resolve(null);
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    console.log('Fetching show posters securely via Wikipedia API...');
    for (const [slug, wikiTitle] of Object.entries(showsWikiMap)) {
        console.log(`\nQuerying Wikipedia for "${wikiTitle}"...`);
        const imgUrl = await getWikiThumbnail(wikiTitle);

        if (imgUrl) {
            console.log(`Found image: ${imgUrl}`);
            const filepath = path.join(showsDir, `${slug}.jpg`);
            try {
                await downloadImage(imgUrl, filepath);
                console.log(`✅ Saved ${slug}.jpg`);
            } catch (e) { console.log(`❌ Failed download: ${e.message}`); }
        } else {
            console.log(`❌ No thumbnail found for ${wikiTitle}`);
        }
        await new Promise(r => setTimeout(r, 500)); // Politeness
    }
}

run();
