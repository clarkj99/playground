const http = require('http')
const services = require('./services')
const pg = require('pg')
const express = require('express')

const url = require('url')


const server = http.createServer();

const config = {
    database: 'backend_development', //env var: PGDATABASE
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT  FROM users, profiles WHERE users.id=profiles.user_id', (err, res) => {
        if (err)
            console.log(err.stack);
        else {
            console.log(res.rows);
        }
        pool.end()
    })
})

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id)
        console.log(req.headers);
    }
})

server.listen(8080);
