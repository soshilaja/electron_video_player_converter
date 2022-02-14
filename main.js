const { app, BrowserWindow, Menu } = require('electron');

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

//Promise function to wait to  creaye window when app module is ready
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
                {label: 'Load'}
            ]},
            { type: 'separator' },
            { role: 'quit' }
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
