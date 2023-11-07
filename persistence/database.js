const typeorm = require("typeorm");


const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "MYDATABASE",
  entities: ["./entity/User"],
  synchronize: true,
});

module.exports = dataSource;