const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res, next) => {
    const { projects } = data;
    res.render('index', { projects });
});

app.get('/about', (req, res, next) => {
    res.render('about');
    next();
});

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

app.use((req, res, next) => {
    console.log('Handling 404 error');
    const err = new Error();
    err.status = 404;
    err.message = 'Uh oh! Page not found!';
    console.log(err.status, err.message);
    next(err);
});

app.use((err, req, res, next) => {
    console.log('Global error handler');
    if (err.status === 404) {
        console.log(err.status, err.message);
        res.status(404);
        res.send(err.message);
    } else {
        const err = new Error();
        err.message = err.message || 'Oh no, there was an error!';
        console.log(err.status, err.message);
        res.status(500);
        res.send(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})