const axios = require("axios").default;
const X2JS = require("x2js");
const fs = require("fs");

const fileName = "./sitemap_stations.xml";

// Removes existing file if it exists
if(fs.existsSync(fileName)){
    console.log("Deleting Existing file: " + fileName);
    fs.rmSync(fileName, {maxRetries: 4});
}

axios.get("https://api.leddepartureboard.com/api/StationLookup")
    .then(data => processStations(data.data))

function processStations(jsonData) {
    jsonData = jsonData.filter(s => s.country === "GB");
    const codes = jsonData.map(s => s.code);
    const sitemap = {
        urlset: {
            url: codes.map(c => {return {loc: `https://www.leddepartureboard.com/${c}`}}),
            "_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"
        }
    }

    fs.writeFileSync("./sitemap_stations.xml", new X2JS().js2xml(sitemap))
    console.log("\nFinished Generating sitemap. Outputted result to: " + fileName)
}
