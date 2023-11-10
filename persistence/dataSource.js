const typeorm = require("typeorm");
const userEntitySchema = require("./entity/User");
const postEntitySchema = require("./entity/Post");

const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "MYDATABASE",
  entities: [userEntitySchema, postEntitySchema],
  synchronize: true,
});


module.exports = dataSource;