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
});

app.get('/project/:id', (req, res, next) => {
    const { id } = req.params;
    const project = data.projects[id];
    res.render('project', { project });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})