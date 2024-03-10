const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const lamda = process.env.LAMBDA_ENDPOINT;
        if (lamda) {
            const response = await axios.get(process.env.LAMBDA_ENDPOINT);
            res..status(200).send(response.data);
        } else {
            res.status(200).send({status: "ok", message: "Lambda ENV variable not set!"});
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});