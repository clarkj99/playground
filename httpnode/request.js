const http = require('http')

const data = JSON.stringify({
    userName: 'Soren'
})

const options = {
    hostnamme: 'localhost',
    port: 8080,
    path: ('/users'),
    method: 'POST',
    headers: {
        'Content_Type': 'application/json',
        'Content-Length': data.length
    }
}

const request = http.request(
    options,
    (response) => {
        console.log(`statusCode:${response.statusCode}`);
        console.log((response.headers));

        response.on('data', (chunk) => {
            console.log('this is a chunk: \n');
            console.log(chunk.toString());
        })
    }
)

request.on('error', err => {
    console.log(err);
})

request.write(data)

request.end()