const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

/*creating a new instance of the Sequelize class. */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //   operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

/*authenticating the connection to the database using Sequelize. */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to mySQL");
  })
  .catch((error) => {
    logError("Connection error : ", error);
  });

/*defining and exporting the database configuration and models using Sequelize. */
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.records = require("./recordModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Resync done");
});

module.exports = db;
