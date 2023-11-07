const  EntitySchema = require("typeorm").EntitySchema;

const userEntitySchema  = new EntitySchema({
  name: "User",
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    username: {
      type: "varchar",
      nullable: true,
    },
    hashedPassword: {
      type: "varchar",
      nullable: true,
    },
  },
});

module.exports = userEntitySchema;