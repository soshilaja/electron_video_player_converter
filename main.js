const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')


// determine if this is running on a mac
const isMac = process.platform === 'darwin';

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}
let mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 605,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


//create a template
//assign the template to the app
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            //custom video and load label
            {label: 'Video',
            submenu: [
                {label: 'Load...', click(){ dialog.showOpenDialog(mainWindow, {
                        filters: [
                          { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mov', '3gp', 'wmv', 'rmvb', 'flv', 'ogv', 'webm', 'mpeg'] }
                        ]
                      })
                      .then(result => {
                          if(!result.canceled){
                              result.filePaths.forEach(filePath =>{
                                  console.log(filePath);
                                  mainWindow.webContents.send("FilePath", filePath);
                              })
                          } else {
                            console.log(canceled);
                          }
                      }).catch(err => {
                        console.log(err);
                      })
                }
            }
            ]},
            { type: 'separator' },
            // { role: 'quit' },
            {
                label: 'Quit',
                //accelerator for mac and windows
                accelerator: isMac ? 'Cmd+Q' : 'Ctrl+Q',
                click(){
                    app.quit()
                }
            },
        ]
    },
    {
        label: 'Developer',
        submenu:[{role:'toggleDevTools'},{role:'reload'}]
    }
];

//add empty menu-item if running on mac
if(isMac){
    menuTemplate.unshift({label:'empty'});
}

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)