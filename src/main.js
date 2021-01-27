const {
  app, BrowserWindow, Tray, Menu,
} = require('electron');
const path = require('path');
const emitter = require('./server/events');
require('./server');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow = null;
let tray = null;

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
  console.log('PATH<>PATH', path.join(__dirname, 'icons/Icon.ico'));
  try {
    // tray = new Tray(path.join(__dirname, 'icons/Icon.ico'));
    tray = new Tray('D:\\CODER\\electron-projects\\nfc-electron\\src\\assets\\icons\\Icon.ico');
    console.log('--------AZAMAT_TRAY', tray);
  } catch (error) {
    console.log(error);
  }
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click() {
        mainWindow.show();
      },
    },
    {
      label: 'Quit',
      click() {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.on('ready-to-show', () => mainWindow.show());
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });
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
