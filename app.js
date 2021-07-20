const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res, next) => {
    const data = data.projects;
    res.render('index', { data });
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

// app.get('/project/:id', (req, res, next) => {
    // const { id } = res.data.projects;
    // console.log(id);
// });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})