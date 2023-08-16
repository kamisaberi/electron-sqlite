const path = require("path");
const $ = require("jquery");
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "database.sqlite"),
  },
});

module.exports.getUsers = async function getUsers() {
  let result = knex.select("FirstName").from("User");
  return result

};
