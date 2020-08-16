const electron = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({
  	webPreferences: {
        nodeIntegration: true
    }
  });
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));

  // Build menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });
});

// Create new post
function createAddWindow(){
  // Create new window
  addWindow = new BrowserWindow({
  	width: 500,
  	height: 300,
  	title: 'Add New Post',
  	webPreferences: {
        nodeIntegration: true
    }
  });
  
  // Load html in window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes:true
  }));

  addWindow.on('close', function(){
  	addWindow = null;
  });
};

// Catch add post
ipcMain.on('add:post', function(e, data){
	mainWindow.webContents.send('add:post', data);
	addWindow.close();
})
// Create menu template
const menuTemplate = [
	{
		label: 'File',
		submenu:[
			{
				label: 'Add New Post',
				click(){
					createAddWindow();
				}
			},
			{
				label: 'Remove All',
				click(){
					mainWindow.webContents.send('clear:post');
				}
			},
			{
				label: 'Quit',
				accelator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	}
];

if(process.env.NODE_ENV !== 'production'){
	menuTemplate.push({
		label: 'Developer Tool',
		submenu:[
			{
				label: 'Toggle Devtool',
				accelator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	})
}