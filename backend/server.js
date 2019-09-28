const express = require('express');
//const cors = require('cors');
//const mysql = require('mysql');

const app = express();

const query_all = 'SELECT * FROM products';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reanodprdcts'
});

conn.connect(err => {
    if(err){
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('got to products')
});

app.get('/products/add', (req, res) =>{
    const {name, price } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES('${name}', ${price})`;
    conn.query(INSERT_PRODUCTS_QUERY, (err, results) =>{
        if(err){
            return res.send(err)
        }else{
            return res.send('successfully added product')
        }
    });
});

app.get('/products', (req, res) =>{
    conn.query(query_all, (err, results) => {
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`)
});