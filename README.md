# departureboard-sitemap-generator

Generates Full Station Sitemaps for Led Departure Board

## How it Works

The generator which fetch a complete list of all stations from the departureboard api. Then foreach station it finds it will create a sitemap url record with the stationCode added to the end of the url.

## How to Run
(You will need node.js installed on your machine)

1. Install dependencies
    ```bash
    npm install
    ```
2. Run the generator
    ```bash
    npm start
    ```
