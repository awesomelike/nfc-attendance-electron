const { app, BrowserWindow } = require('electron');
const emitter = require('./server/events');
require('./server');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });

  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.on('ready-to-show', () => mainWindow.show());
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

emitter.on('deviceActivated', (device) => {
  console.log('GENTLELADY!');
  setTimeout(() => {
    mainWindow.webContents.send('deviceActivated', device.name);
  }, 5000);
});

emitter.on('deviceDeactivated', () => {
  mainWindow.webContents.send('deviceDeactivated');
});

emitter.on('cardReceived', (rfid) => {
  mainWindow.webContents.send('cardReceived', rfid);
});
emitter.on('cardRemoved', () => {
  mainWindow.webContents.send('cardRemoved');
});
