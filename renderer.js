/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const electron = require("electron");
const path = require("path");
const $ = require("jquery");
var resultEl = document.getElementById("result");
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "database.sqlite"),
  },
});

let btn = document.getElementById("btn1");
btn.addEventListener("click", () => {
  let result = knex.select("FirstName").from("User");
  result.then((rows) => {
    for (let row of rows) {
      $("#result").append(row.FirstName.toString() + "<br>");
    }
  });

});

$("#btn2").on("click", () => {
  let result = knex.select("FirstName").from("User");
  result.then((rows) => {
    for (let row of rows) {
      $("#result").append(row.FirstName.toString() + "<br>");
    }
  });
});
