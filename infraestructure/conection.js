/*CONEXAO COM O BANCO DE DADOS - MYSQL */

const mysql = require('mysql')

const conection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'agenda_petshop'
    
})

module.exports = conection