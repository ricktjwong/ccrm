import nodemailer from 'nodemailer'
let directTransport = require('nodemailer-direct-transport')

export const origin = process.env.ORIGIN as string

export const transporter = nodemailer.createTransport(
  directTransport({
    name: 'smtp.ccrm.com',
  })
)

export const dbConfig = {
  database: process.env.DB_DATABASE as string,
  host: process.env.DB_HOST as string,
  password: process.env.DB_PASSWORD as string,
  port: process.env.DB_PORT as string,
  user: process.env.DB_USER as string,
}

export const jwtConfig = {
  cookieDomain: process.env.COOKIE_DOMAIN as string,
  secret: process.env.JWT_SECRET as string,
  maxAge: process.env.JWT_MAX_AGE as string,
  secure: process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test',
}
