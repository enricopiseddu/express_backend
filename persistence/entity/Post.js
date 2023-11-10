const  EntitySchema = require("typeorm").EntitySchema;

const postEntitySchema  = new EntitySchema({
  name: "Post",
  tableName: 'Posts',
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    title: {
      type: "varchar",
      nullable: true,
    },
    notes: {
      type: "text",
      nullable: true,
    },
    date: {
        type: "timestamp",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
      },
    userId: {
        type: "varchar",
        nullable: true,
      },
  },

  relations:{
    user: {
        target: "User",
        type: "many-to-one",
        joinTable: true,
        cascade: true //se un utente viene eliminato, viene eliminato anche i post ad esso associati
    }
  }


});

module.exports = postEntitySchema;