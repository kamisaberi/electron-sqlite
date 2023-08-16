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

const dbHelper = require("./dbHelper");
let btn = document.getElementById("btn1");
btn.addEventListener("click", () => {
  let result = knex.select("name").from("users");
  $("#result").html("");
  $("#logs").html("java script test");

  result.then((rows) => {
    for (let row of rows) {
      $("#result").append(row.name.toString() + "<br>");
    }
  });
});

$("#btn2").on("click", () => {
  let result = knex.select("name").from("users");
  $("#result").html("");
  $("#logs").html("jquery test");
  result.then((rows) => {
    for (let row of rows) {
      $("#result").append(row.name.toString() + "<br>");
    }
  });
});

$("#btn3").on("click", () => {
  ipc.send("GET_USERS");
  ipc.on("GET_USERS", function (evt, rows) {
    console.log(rows);
    $("#result").html("");
    $("#logs").html("send signal test (awesome)");
    for (let row of rows) {
      $("#result").append(row.name.toString() + "<br>");
    }
  });
});

$("#btnInsert").on("click", () => {
  let name = $("#txtName").val();
  let family = $("#txtFamily").val();
  let age = $("#txtAge").val();
  knex("users")
    .insert({ name: name, family: family, age: age })
    .then(() => {});
});

$("#btnInsertUsingSignal").on("click", () => {
  let name = $("#txtName").val();
  let family = $("#txtFamily").val();
  let age = $("#txtAge").val();
  
  ipc.send("SAVE_USER", {name : name , family : family , age : age});
  ipc.on("SAVE_USER", function (evt, data) {
    console.log(data)
  });
});
