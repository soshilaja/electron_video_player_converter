const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');

// determine if this is running on a mac
const isMac = process.platform === 'darwin';


//Create the window in which the video will load
const createWindow = () => {
    const mainWindow = new BrowserWindow({ 
        width: 1000, 
        height: 605, 
        resizable: false, 
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    });
    
    //Load our local HTML file
    mainWindow.loadFile('index.html')

    // helps to load the window all at once
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    
}

//Promise function to wait to  create window when app module is ready
app.whenReady().then(() => {
//     ipcMain.handle('dialogue:openfile', handleFileOpen)
      createWindow()
//       app.on('activate', function () {
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//       })
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
                {label: 'Load...', click(){ dialog.showOpenDialog(createWindow, {
                        filters: [
                          { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mov', '3gp', 'wmv', 'rmvb', 'flv', 'ogv', 'webm', 'mpeg'] }
                        ]
                      })
                      .then(result => {
                          if(!result.cancelled){
                              result.filePaths.forEach(path =>{
                                  console.log(path);
                              })
                          } else {
                              console.log(cancelled);
                          }
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


  