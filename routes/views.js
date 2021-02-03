const express = require('express');
const router = express.Router();
const fs = require('file-system');
const axios = require('axios');

const config = require('../config');

router.get('/', (req, res) => {
    axios.get(config.BASE + '/api/landing/').then((data) => {
        res.render('index.njk', { title: 'Home', heading: data.data.heading, subheading: data.data.subheading });
    });
});

router.get('/about', (req, res) => {
    axios.get(config.BASE + '/api/about/').then((data) => {
        res.render('about.njk', { title: 'About Me', about: data.data.about });
    });
});

router.get('/posts', (req, res) => {
    axios.get(config.BASE + '/api/posts/').then((data) => {
        res.render('posts.njk', { title: 'Latest Posts', posts: data.data });
    });
});

router.get('/posts/:id', (req, res) => {
    axios.get(config.BASE + '/api/posts/' + req.params.id).then((data) => {
        res.render('post.njk', { title: data.data.title, post: data.data });
    }, (err) => {
        res.redirect('/404');
    });
});

router.get('/login', (req, res) => {
    if (!req.session.auth) {
        res.render('login.njk', { title: 'Login' });
    } else {
        res.redirect('/');
    }
});

router.get('/submit', (req, res) => {
    if (req.session.auth) {
        res.render('submit.njk', { title: 'Submit Post' });
    } else {
        res.redirect('/login');
    }
});

router.get('/settings', (req, res) => {
    if (req.session.auth) {
        axios.get(config.BASE + '/api/landing/').then((data) => {
            const landing = data.data;
            axios.get(config.BASE + '/api/about/').then((data) => {
                const about = data.data;
                res.render('settings.njk', { title: 'Blog Settings', heading: landing.heading, subheading: landing.subheading, about: about.about });
            });
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;