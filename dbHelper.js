const path = require("path");
const $ = require("jquery");
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "database.sqlite"),
  },
});

module.exports.getUsers = function getUsers() {
  let result = knex.select("name").from("users");
  return result.then((res) => {
    return res;
  });
};
