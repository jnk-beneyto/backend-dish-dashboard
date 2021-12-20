require('dotenv').config()

let dbURI
if (process.env.NODE_ENV ==='development'){
  dbURI = process.env.DB_DEV
}
if (process.env.NODE_ENV ==='test'){
  dbURI = process.env.DB_TEST
}
if (process.env.NODE_ENV ==='production'){
  dbURI = process.env.DB_DEV
}

module.exports = {
    PORT: process.env.PORT,
    APP_NAME: process.env.APP_NAME,
    DB: dbURI,
}