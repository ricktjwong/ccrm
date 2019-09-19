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
  logging: process.env.NODE_ENV !== 'test',
}

export const jwtConfig = {
  expiry: process.env.JWT_EXPIRY as string,
  secret: process.env.JWT_SECRET as string,
}

export const cookieConfig = {
  domain: process.env.COOKIE_DOMAIN as string,
  expiry: process.env.COOKIE_EXPIRY as string,
  secure: process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test',
}
