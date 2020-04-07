const pg = require('pg')

const config = {
    database: 'node_test'
}

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT  name, age FROM  users', (err, res) => {
        if (err)
            console.log(err.stack);
        else {
            console.log(res.rows);
        }
        pool.end()
    })
})
