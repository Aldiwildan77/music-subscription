// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'music-subscription',
      user:     'postgres',
      password: '1k1J3n3ng3Pw0rd'
    },
    migrations: {
      directory: "./src/models"
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'music-subscription',
      user:     'postgres',
      password: '1k1J3n3ng3Pw0rd'
    },
    migrations: {
      directory: "./src/models"
    }
  }

};
