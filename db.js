const knexDB = require('knex');

const knexConfig = {
    client: 'mssql', // or 'mysql', 'sqlite3', etc.
    connection: {
        host: 'ip',
        user: 'username',
        password: 'password',
        database: 'database name'
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    pool: { min: 0, max: 7 }
};

module.exports = knexDB(knexConfig);
