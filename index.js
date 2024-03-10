const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/test', async (req, res) => {
    try {
        const response = await axios.get(process.env.LAMBDA_ENDPOINT);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});