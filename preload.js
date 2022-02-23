const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onFileDataRetrieved: function (func) {
    ipcRenderer.on("FilePath", (event, fileData) => func(fileData));
  }
});
