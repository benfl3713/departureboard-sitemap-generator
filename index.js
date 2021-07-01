const axios = require("axios").default;
const X2JS = require("x2js");
const fs = require("fs");

axios.get("https://api.leddepartureboard.com/api/StationLookup")
    .then(data => processStations(data.data))

function processStations(jsonData) {
    jsonData = jsonData.filter(s => s.country === "GB");
    const codes = jsonData.map(s => s.code);
    const sitemap = {
        urlset: {
            url: codes.map(c => {return {loc: `https://www.leddepartureboard.com/${c}`}})
        }
    }

    fs.writeFileSync("./sitemap_stations.xml", new X2JS().js2xml(sitemap))
}
