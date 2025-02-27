const knexDB = require('knex');

const knexConfig = {
    client: 'mssql', // or 'mysql', 'sqlite3', etc.
    connection: {
        host: '10.0.4.12',
        user: 'Info',
        password: 'Test@1234',
        database: 'TCS_ONLINE_DEMO'
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    pool: { min: 0, max: 7 }
};

module.exports = knexDB(knexConfig);
