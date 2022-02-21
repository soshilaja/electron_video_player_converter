const { app, BrowserWindow, Menu, dialog } = require('electron');

// determine if this is running on a mac
const isMac = process.platform === 'darwin';

//Create the window in which the video will load
const createWindow = () => {
    const win = new BrowserWindow({ width: 1000, height: 605, resizable: false, show: false});
    
    //Load our local HTML file
    win.loadFile('index.html')

    win.once('ready-to-show', () => {
        win.show()
    })
    
}

//Promise function to wait to  create window when app module is ready
app.whenReady().then(() => {
    createWindow();
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
                {label: 'Load...',
                click(){
                    //create a dialogue object
                    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
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
        submenu:[{role:'toggleDevTools'}]
    }
];

//add empty menu-item if running on mac
if(isMac){
    menuTemplate.unshift({label:'empty'});
}

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)
