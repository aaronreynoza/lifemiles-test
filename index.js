const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/', async (req, res) => {
    try {
        const lamda = process.env.LAMBDA_ENDPOINT;
        if (lamda) {
            const response = await axios.get(process.env.LAMBDA_ENDPOINT);
            fs.readFile('test-data/README.md', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                res.status(200).send({
                    time: response.data,
                    table: data
                });
              });
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