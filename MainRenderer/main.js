const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

console.log('main process working from main.js...');


let winOne, winTwo;

function createWindow(){
    winOne = new BrowserWindow();
    winTwo = new BrowserWindow();

    winOne.loadURL(url.format({
        pathname: path.join(__dirname, 'one.html'),
        protocol: 'file',
        slashes: true
    }));

    winTwo.loadURL(url.format({
        pathname: path.join(__dirname, 'two.html'),
        protocol: 'file',
        slashes: true
    }));

     

    winOne.webContents.openDevTools();
    winTwo.webContents.openDevTools();
    
    winOne.on('closed', () => {
        winOne = null;
    });

    winTwo.on('closed', () => {
        winTwo = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if (winOne === null || winTwo === null){
        createWindow();
    }
});