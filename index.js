const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const app = {};

app.config = {
    post: 3000,
};

app.creteServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.post, () => {
        console.log(`Server listening on ${app.config.post}`);
    });
};

app.handleReqRes = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryString = parseUrl.query;
    const headersObject = req.headers;
    let realData = '';

    const decoder = new StringDecoder('utf-8');

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
    });

    res.end('Welcome to the server!');
};

app.creteServer();
