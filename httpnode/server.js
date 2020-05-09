const http = require('http')
const services = require('./services')
// const pg = require('pg')
// const express = require('express')
const jsonBody = require('body/json');


const url = require('url')


const server = http.createServer();

// const config = {
//     database: 'backend_development', //env var: PGDATABASE
// };

// const pool = new pg.Pool(config);

// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query('SELECT  FROM users, profiles WHERE users.id=profiles.user_id', (err, res) => {
//         if (err)
//             console.log(err.stack);
//         else {
//             console.log(res.rows);
//         }
//         pool.end()
//     })
// })

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id)
        res.setHeader('Content-Type', 'application:json');
        res.statusCode = 200
        console.log(req.headers);
        const serializedJSON = JSON.stringify(metadata)
        res.write(serializedJSON)
        res.end()
    } else if (req.method === 'POST' && parsedUrl.pathname === '/users') {
        jsonBody(req, req, (err, body) => {
            if (err) {
                console.log(err);
            } else {
                console.log(body);
                services.createUser(body['userName']);
            }
        })
    } else {
        res.statusCode = 404;
        res.setHeader('X-Powered-By', 'Node')
        res.end()
    }
})

server.listen(8080);
