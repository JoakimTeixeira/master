const dotenv = require('dotenv')
dotenv.config()

const aws = {
  production: {
    bucket: process.env.AWS_BUCKET_PROD,
    region: process.env.AWS_BUCKET_REGION_PROD,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_PROD,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PROD
  },
  develop: {
    bucket: process.env.AWS_BUCKET_DEVELOP,
    region: process.env.AWS_BUCKET_REGION_DEVELOP,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_DEVELOP,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEVELOP
  }
}

const mongo = {
  production: process.env.MONGOPRODUCTION,
  develop: process.env.MONGODEVELOP,
  local: process.env.MONGOLOCAL
}

const mysql = {
  production: {
    url: process.env.MYSQLPRODUCTION,
    user: process.env.MYSQLUSERPRODUCTION,
    password: process.env.MYSQLPASSPRODUCTION,
    dbname: process.env.MYSQLDBNAMEPRODUCTION,
    port: process.env.MYSQLPORTPRODUCTION
  },
  develop: {
    url: process.env.MYSQLDEVELOP,
    user: process.env.MYSQLUSERDEVELOP,
    password: process.env.MYSQLPASSDEVELOP,
    dbname: process.env.MYSQLDBNAMEDEVELOP,
    port: process.env.MYSQLPORTDEVELOP
  },
  local: {
    url: process.env.MYSQLLOCAL,
    user: process.env.MYSQLUSERLOCAL,
    password: process.env.MYSQLPASSLOCAL,
    dbname: process.env.MYSQLDBNAMELOCAL,
    port: process.env.MYSQLPORTLOCAL
  }
}

const smtp = {
  server: process.env.SMTP_SERVER,
  user: process.env.SMTP_USER,
  secure: process.env.SMTP_SECURE,
  password: process.env.SMTP_PASS,
  port: process.env.SMTP_PORT,
  receiver: process.env.SMTP_RECEIVER
}

const urls = {
  blog: process.env.URL_BLOG,
  panel: process.env.URL_PANEL,
  blogLocal: process.env.URL_BLOG_LOCAL,
  panelLocal: process.env.URL_PANEL_LOCAL
}

const secrets = {
  tag: {
    algorithm: process.env.TAG_ALGORITHM,
    secret: process.env.TAG_SECRET,
    binEncode: process.env.TAG_BINARY_ENCODE,
    encode: process.env.TAG_ENCODE
  },
  auth: {
    algorithm: process.env.AUTH_ALGORITHM,
    secret: process.env.AUTH_SECRET,
    binEncode: process.env.AUTH_BINARY_ENCODE,
    encode: process.env.AUTH_ENCODE
  },
  others: {
    algorithm: process.env.OTHERS_ALGORITHM,
    secret: process.env.OTHERS_SECRET,
    binEncode: process.env.OTHERS_BINARY_ENCODE,
    encode: process.env.OTHERS_ENCODE
  }
}

const jwt = {
  issuer: process.env.JWT_ISSUER
}

const captcha = {
  url: process.env.CAPTCHA_URL,
  siteKey: process.env.CAPTCHA_SITE_KEY,
  secretKey: process.env.CAPTCHA_SECRET_KEY
}

const articleData = {
  defaultUri: () => `${Date.now()}${Math.floor(Math.random() * 123555738)}`
}

const rootUser = {
  _id: process.env.ROOT_ID,
  name: process.env.ROOT_NAME,
  email: process.env.ROOT_EMAIL,
  pass: process.env.ROOT_PASSWORD,
  tag: process.env.ROOT_TAG
}

/**
 * @module EnvironmentVariables
 * @description Exports environments variable for all application.
 */
module.exports = {
  aws,
  dbProduction: { url: mongo.production },
  dbLocal: {
    mongo: { url: mongo.local },
    mysql: {
      client: 'mysql',
      connection: {
        host: mysql.local.url,
        user: mysql.local.user,
        port: mysql.local.port,
        password: mysql.local.password,
        database: mysql.local.dbname,
        dateStrings: true
      },
      pool: {
        min: 0,
        max: 5,
        afterCreate: function (conn, done) {
          // eslint-disable-next-line no-console
          console.log(`Mysql Connection Opened at ${new Date()}`)
          done(null, conn)
        }
      },
      acquireConnectionTimeout: 30000,
      migrations: {
        directory: './config/database/migrations/mysql'
      }
    }
  },
  dbDevelopment: {
    mongo: { url: mongo.develop },
    mysql: {
      client: 'mysql',
      connection: {
        host: mysql.develop.url,
        user: mysql.develop.user,
        port: mysql.develop.port,
        password: mysql.develop.password,
        database: mysql.develop.dbname,
        dateStrings: true
      },
      pool: {
        min: 0,
        max: 5,
        afterCreate: function (conn, done) {
          // eslint-disable-next-line no-console
          console.log(`Mysql Connection Opened at ${new Date()}`)
          done(null, conn)
        }
      },
      acquireConnectionTimeout: 30000,
      migrations: {
        directory: './config/database/migrations/mysql'
      }
    }
  },

  SMTP_SETTINGS: {
    server: smtp.server,
    user: smtp.user,
    secure: smtp.secure,
    password: smtp.password,
    port: smtp.port,
    receiver: smtp.receiver
  },

  webApp: {
    default: urls.blog,
    local: urls.blogLocal
  },

  panel: {
    default: urls.panel,
    local: urls.panelLocal
  },

  SECRET_TAG_PACKAGE: {
    algorithm: secrets.tag.algorithm,
    secret: secrets.tag.secret,
    binEncode: secrets.tag.binEncode,
    encode: secrets.tag.encode
  },

  SECRET_AUTH_PACKAGE: {
    algorithm: secrets.auth.algorithm,
    secret: secrets.auth.secret,
    binEncode: secrets.auth.binEncode,
    encode: secrets.auth.encode
  },

  SECRET_DEFAULT_PACKAGE: {
    algorithm: secrets.others.algorithm,
    secret: secrets.others.secret,
    binEncode: secrets.others.binEncode,
    encode: secrets.others.encode
  },

  issuer: jwt.issuer,

  captchaSettings: {
    url: captcha.url,
    siteKey: captcha.siteKey,
    secretKey: captcha.secretKey
  },

  articleData,
  rootUser
}
