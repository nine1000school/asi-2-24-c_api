import "dotenv/config"

const config = {
  port: process.env.PORT,
  db: {
    filename: process.env.DB_FILENAME,
  },
}

export default config
