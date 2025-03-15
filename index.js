const express = require('express');
const knexConf = require('./db');
const app = express();
const port = 3000;

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const requestIp = require('request-ip');
const sendResponse = require('./sendResponse');

require('dotenv').config();

// Middleware to use the Knex instance in app routes
app.use((req, res, next) => {
    req.knex = knexConf;
    next();
});

// Middleware to use requestIp
app.use(requestIp.mw());

app.use(bodyParser.json())
app.use(cors());
app.use(sendResponse);


const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');


//  routes here
app.use('', userRoutes);
app.use('/user', upload.array(), userRoutes);
app.use('/product', upload.array(), productRoutes);
app.use('/auth', upload.array(), authRoutes)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

