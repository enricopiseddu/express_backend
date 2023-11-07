const { EntitySchema } = require("typeorm");

const userEntitySchema = new EntitySchema({
  name: "users",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    username: {
      type: "varchar",
    },
    hashedPassword: {
      type: "varchar",
    },
  },
});

module.exports = userEntitySchema;