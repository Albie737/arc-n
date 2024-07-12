const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/fetch-html', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL parameter is required');
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const html = await response.text();
        res.send(html);
    } catch (error) {
        res.status(500).send('Failed to fetch the page: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
