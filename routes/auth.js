const express = require('express');
const router = express.Router();
const fs = require('file-system');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    fs.readFile('./source/config/users.json', 'utf-8', (err, data) => {
        if (err && err.errno === -4058) {
            res.sendStatus(500);
        } else if (err) {
            throw err;
        } else {
            data = JSON.parse(data);
            bcrypt.compare(req.body.password, data[req.body.username], function(err, result) {
                if (result) {
                    req.session.auth = true;
                    res.sendStatus(204);
                } else {
                    res.sendStatus(401);
                }
            });
        }
    });
});

router.delete('/', (req, res) => {
    req.session.destroy();
});

module.exports = router;