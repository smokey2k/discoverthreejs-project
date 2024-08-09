require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const SSLKEY = process.env.SSLKEY;
const SSLCERT = process.env.SSLCERT;

if (!SSLKEY || !SSLCERT) {
    console.error('Error: SSLKEY and SSLCERT must be defined in .env file');
    process.exit(1);
}
const options = {
    key: (() => {
        try {
            return fs.readFileSync(SSLKEY);
        } catch (err) {
            console.error(`Error loading SSL key from ${SSLKEY}:`, err);
            process.exit(1);
        }
    })(),
    cert: (() => {
        try {
            return fs.readFileSync(SSLCERT);
        } catch (err) {
            console.error(`Error loading SSL certificate from ${SSLCERT}:`, err);
            process.exit(1);
        }
    })()
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https.createServer(options, app).listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`HTTPS Server running on port ${PORT}`);
    }
});
