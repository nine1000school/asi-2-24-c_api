import "dotenv/config"

const config = {
  port: process.env.PORT,
  db: {
    filename: process.env.DB_FILENAME,
  },
  security: {
    session: {
      tokenLength: 128,
    },
    password: {
      salt: process.env.SECURITY_PASSWORD_SALT,
      keylen: Number.parseInt(process.env.SECURITY_PASSWORD_KEYLEN, 10),
      iterations: Number.parseInt(process.env.SECURITY_PASSWORD_ITERATIONS, 10),
      digest: "sha512",
    },
  },
}

export default config
