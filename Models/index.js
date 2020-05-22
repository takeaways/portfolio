const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
});

const User = require("./user")(sequelize, Sequelize);
const Post = require("./post")(sequelize, Sequelize);
const Image = require("./image")(sequelize, Sequelize);

const db = {
    sequelize,
    Sequelize,
    Image,
    Post,
    User,

};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

