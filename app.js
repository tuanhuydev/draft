const path = require('path');
const express = require('express');
const sassMiddleware = require('node-sass-middleware')

const app = express();
const port = 3000;

app.use(sassMiddleware({
    src: path.resolve(__dirname, 'stylesheets'),
    dest: path.resolve(__dirname, 'public'),
    debug: true,
    force: true,
    indentedSyntax: false,
    error: (error => console.error(`ERROR: ${error}`)),
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/trillo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/trillo.html'));
});
app.get('/', (req, res) => {
    res.end('Hello World');
});

app.listen(port, () => {
    console.log(`Server is listenning at http://localhost:${port}`);
});