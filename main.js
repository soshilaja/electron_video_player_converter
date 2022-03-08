const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");

const ProgressBar = require("electron-progressbar");

const ffmpeg = require("fluent-ffmpeg");
const ffmpegStaticPath = require("ffmpeg-static-electron");
const ffprobeStaticPath = require("ffprobe-static-electron");

//Global decalration of the video filepath
originPath = null;

//ffmpeg path declaration
ffmpeg.setFfmpegPath(ffmpegStaticPath.path);
ffmpeg.setFfprobePath(ffprobeStaticPath.path);

// determine if this is running on a mac
const isMac = process.platform === "darwin";

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 605,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

//create a template
//assign the template to the app
const menuTemplate = [
  {
    label: "File",
    submenu: [
      //custom video and load label
      {
        label: "Video",
        submenu: [
          {
            label: "Load...",
            click() {
              dialog
                .showOpenDialog(mainWindow, {
                  filters: [
                    {
                      name: "Movies",
                      extensions: [
                        "mkv",
                        "avi",
                        "mp4",
                        "mov",
                        "3gp",
                        "wmv",
                        "rmvb",
                        "flv",
                        "ogv",
                        "webm",
                        "mpeg",
                      ],
                    },
                  ],
                  properties: ["openFile"],
                })
                .then((result) => {
                  if (!result.canceled) {
                    result.filePaths.forEach((filePath) => {
                      mainWindow.webContents.send("FilePath", filePath);

                      //declaration to make the movie filepath available all through the code
                      originPath = filePath;

                      //Menu event listener to enable file conversion once video file is loaded
                      Menu.getApplicationMenu().getMenuItemById(
                        "enable-AVI"
                      ).enabled = true;
                      Menu.getApplicationMenu().getMenuItemById(
                        "enable-MP4"
                      ).enabled = true;
                      Menu.getApplicationMenu().getMenuItemById(
                        "enable-WEBM"
                      ).enabled = true;
                      console.log(filePath);
                    });
                  } else {
                    console.log("canceled");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            type: "separator",
          },
          {
            id: "enable-AVI",
            label: "Convert to AVI...",
            enabled: false,
            click() {
              dialog
                .showSaveDialog(mainWindow, {
                  title: "Save Converted Video",
                  defaultPath: app.getPath("videos") + "/converted.avi",
                  buttonLabel: "Save to AVI File",
                  filters: [{ name: "avi", extensions: ["avi"] }],
                  properties: [],
                })
                .then((filePath_obj) => {
                  if (!filePath_obj.canceled) {
                    console.log("absolute path: ", filePath_obj.filePath);

                    let progressBar = new ProgressBar({
                      browserWindow: { parent: mainWindow },
                      indeterminate: false,
                      text: "Preparing data...",
                      detail: "Converting...",
                    });

                    ffmpeg(originPath)
                      .toFormat("avi")

                      .on("error", function (err) {
                        console.log("An error occurred: " + err.message);
                      })
                      .on("end", function () {
                        console.log("Processing finished !");
                      })
                      .on("progress", function (stdout, stderr) {
                        console.log(stdout);
                        progressBar.value = Math.floor(stdout.percent);
                        progressBar.on("progress", function (value) {
                          progressBar.detail = `${value}% out of 100% completed...`;
                        });
                      })
                      .save(filePath_obj.filePath);
                  } else {
                    console.log("canceled");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            id: "enable-MP4",
            label: "Convert to MP4...",
            enabled: false,
            click() {
              dialog
                .showSaveDialog(mainWindow, {
                  title: "Save Converted Video",
                  defaultPath: app.getPath("videos") + "/converted.mp4",
                  buttonLabel: "Save to MP4 File",
                  filters: [{ name: "mp4", extensions: ["mp4"] }],
                  properties: [],
                })
                .then((filePath_obj) => {
                  if (!filePath_obj.canceled) {
                    console.log("absolute path: ", filePath_obj.filePath);

                    let progressBar = new ProgressBar({
                      browserWindow: { parent: mainWindow },
                      indeterminate: false,
                      text: "Preparing data...",
                      detail: "Converting...",
                    });

                    ffmpeg(originPath)
                      .toFormat("mp4")

                      .on("error", function (err) {
                        console.log("An error occurred: " + err.message);
                      })
                      .on("end", function () {
                        console.log("Processing finished !");
                      })
                      .on("progress", function (stdout, stderr) {
                        console.log(stdout);
                        progressBar.value = Math.floor(stdout.percent);
                        progressBar.on("progress", function (value) {
                          progressBar.detail = `${value}% out of 100% completed...`;
                        });
                      })
                      .save(filePath_obj.filePath);
                  } else {
                    console.log("canceled");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          //electron's showsavedialod Window
          {
            id: "enable-WEBM",
            label: "Convert to WEBM...",
            enabled: false,
            click() {
              dialog
                .showSaveDialog(mainWindow, {
                  title: "Save Converted Video",
                  defaultPath: app.getPath("videos") + "/converted.webm",
                  buttonLabel: "Save to WEBM File",
                  filters: [{ name: "webm", extensions: ["webm"] }],
                  properties: [],

                  //the promise that returns the saved file's filepath
                })
                .then((filePath_obj) => {
                  if (!filePath_obj.canceled) {
                    console.log("absolute path: ", filePath_obj.filePath);

                    //electron progress bar declaration and integration into the conversion process
                    let progressBar = new ProgressBar({
                      //make the progress bar a child of the mainwindow do you cant
                      // close the main window during a the conversion process
                      browserWindow: { parent: mainWindow },
                      indeterminate: false,
                      text: "Preparing data...",
                      detail: "Converting...",
                    });

                    //ffmpeg to convert the files after the filepath has been determined
                    ffmpeg(originPath)
                      .toFormat("webm")

                      .on("error", function (err) {
                        console.log("An error occurred: " + err.message);
                      })
                      .on("end", function () {
                        console.log("Processing finished !");
                      })

                      // the progrss method of the progress bar is nested within
                      //that of ffmpeg
                      .on("progress", function (stdout, stderr) {
                        console.log(stdout);
                        progressBar.value = Math.floor(stdout.percent);

                        //electron progress bar details
                        progressBar.on("progress", function (value) {
                          progressBar.detail = `${value}% out of 100% completed...`;
                        });
                      })
                      .save(filePath_obj.filePath);
                  } else {
                    console.log("canceled");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
        ],
      },
      { type: "separator" },
      // { role: 'quit' },
      {
        label: "Quit",
        //accelerator for mac and windows
        accelerator: isMac ? "Cmd+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: "Developer",
    submenu: [{ role: "toggleDevTools" }, { role: "reload" }],
  },
];

//add empty menu-item if running on mac
if (isMac) {
  menuTemplate.unshift({ label: "empty" });
}

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
