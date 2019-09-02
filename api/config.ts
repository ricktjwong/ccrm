const config = {
  database: process.env.DB_DATABASE as string,
  host: process.env.DB_HOST as string,
  password: process.env.DB_PASSWORD as string,
  port: process.env.DB_PORT as string,
  user: process.env.DB_USER as string,
}

export default config
