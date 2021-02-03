const express = require('express');
const router = express.Router();
const fs = require('file-system');

const markdownToJSON = require('../helpers/markdownToJSON');

router.post('/posts', (req, res) => {
    if (req.session.auth) {
        const d = Date.now();
        if (req.body.title && req.body.summary && req.body.body) {
            fs.writeFile('./source/posts/' + d.toString() + '.md', req.body.title + '\n---\n' + d.toString() + '\n---\n' + req.body.summary + '\n---\n' + req.body.body, (err) => {
                if (err) throw err;
                res.sendStatus(204);
            });
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);   
    }
});


router.get('/posts', (req, res) => {
    fs.readdir('./source/posts', async (err, files) => {
        if (err) throw err;
        if (!req.query.offset) req.query.offset = 0;
        files.reverse();
        const posts = [];
        for (const post of files) {
            const data = await fs.readFileSync('./source/posts/' + post, 'utf8');
            posts.push(markdownToJSON(data));
        }
        res.send(posts);
    });
});

router.get('/posts/:id', (req, res) => {
    fs.readFile('./source/posts/' + req.params.id + '.md', 'utf-8', (err, data) => {
        if (err && err.errno === -4058) {
            res.sendStatus(404);
        } else if (err) {
            res.sendStatus(500);
            throw err;
        } else {
            res.send(markdownToJSON(data));
        }
    });
});

router.delete('/posts/:id', (req, res) => {
    if (req.session.auth) {
        fs.unlink('./source/posts/' + req.params.id + '.md', (err) => {
            if (err && err.errno === -4058) {
                res.sendStatus(404);
            } else if (err) {
                res.sendStatus(500);
                throw err;
            } else {
                res.sendStatus(204);
            }
        });
    } else {
        res.sendStatus(401);   
    }
});

router.get('/landing', (req, res) => {
    fs.readFile('./source/config/landing.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        } else {
            res.send(JSON.parse(data));
        }
    });
});

router.get('/about', (req, res) => {
    fs.readFile('./source/config/about.md', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        } else {
            res.send({ about: data });
        }
    });
});

router.put('/settings', (req, res) => {
    if (req.session.auth) {
        if (req.body.heading && req.body.subheading && req.body.about) {
            fs.writeFile('./source/config/landing.json', JSON.stringify({ heading: req.body.heading, subheading: req.body.subheading }), (err) => {
                if (err) throw err;
                fs.writeFile('./source/config/about.md', req.body.about, (err) => {
                    if (err) throw err;
                    res.sendStatus(204);
                });
            });
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;