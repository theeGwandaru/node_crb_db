var mysql = require('mysql');

class Session{
    constructor(){
        this.pool = mysql.createPool({
            connectionLimit: 10,
            database: 'node_crb',
            user: 'node_crb',
            password:'password',
            host:'127.0.0.1'
        })
    }
}

module.exports = Session;