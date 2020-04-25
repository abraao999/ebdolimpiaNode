const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "mysql669.umbler.com",
    user: "abraaoadmin",
    password: "tv84361033",
    database: "dbebd"
  }
});
module.exports = knex;
