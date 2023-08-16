const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const dbHelper = require("./dbHelper");
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "database.sqlite"),
  },
});
app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    height: 800,
    width: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    nodeIntegration: true,
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  // ipcMain.on("mainWindowLoaded", function () {
  //   let result = knex.select("name").from("users");
  //   result.then(function (rows) {
  //     mainWindow.webContents.send("resultSent", rows);
  //   });
  // });

  ipcMain.on("GET_USERS", async function (e, d) {
    let data = await dbHelper.getUsers();
    e.reply("GET_USERS", data);
  });

  ipcMain.on("SAVE_USER", async function (e, data) {
    let ret = dbHelper.saveUser(data);
    e.reply("SAVE_USER", ret);
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
