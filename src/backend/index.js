const ENV = process.env.NODE_ENV || 'development';

if (ENV !== 'production') {
    require('dotenv').config();
}

require('./server');
