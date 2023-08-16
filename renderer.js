/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const path = require("path");
const $ = require("jquery");
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "database.sqlite"),
  },
});

const electron = require("electron");
const ipc = electron.ipcRenderer;

const signals = require("./databaseHelper");
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

$("#btn3").on("click", () => {
  console.log("11");
  ipc.send("GET_USERS");
  ipc.on("SEND_USERS", function (evt, rows) {
    console.log(rows);
    // for (let row of rows) {
    //   console.log("33");
    //   $("#result").append(row.FirstName.toString() + "<br>");
    // }
  });
});
