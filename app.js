const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

/**
 * Router for home (index) page
 */
app.get('/', (req, res, next) => {
    const { projects } = data;
    res.render('index', { projects });
});

/**
 * Router for about page
 */
app.get('/about', (req, res, next) => {
    res.render('about');
    next();
});

/**
 * Router for project pages (includes error handling)
 */
app.get('/project/:id', (req, res, next) => {
    const { id } = req.params;
    const project = data.projects[id];

    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = 'Oops! Requested project does not exist.';
        next(err);
    }
});

/**
 * 404 Error handler
 */
app.use((req, res, next) => {
    console.log('Handling 404 error');
    const err = new Error();
    err.status = 404;
    err.message = 'Uh oh! Page not found!';
    console.log(err.status, err.message);
    res.render('page-not-found', { err });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
    console.log('Global error handler');
    if (err.status === 404) {
        console.log(err.status, err.message);
        res.status(404);
    } else {
        const err = new Error();
        err.message = err.message || 'Oh no, there was an error!';
        console.log(err.status, err.message);
        res.status(500);
    }
    res.render('error', { err });
});

/**
 * Start server
 */
app.listen((process.env.PORT || 3000), () => {
    console.log('Server listening on port 3000');
})