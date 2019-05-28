const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());
app.post('/submit', (req, res) => {
    setTimeout(function () {
        const details = req.body.details;
        res.json({ msg: true, data: details })
    }, 3000);
})
app.listen(3001, () => {
    console.log('listen to port 3001');
})