const { ipcRenderer } = require('electron');
require('./index.css');

let originalDeviceName = 'Unknown';
let originalDeviceStatus = 'Disconnected';

const deviceNameField = document.querySelector('#device-name');
const deviceStatusField = document.querySelector('#device-status');

ipcRenderer.on('deviceActivated', (event, deviceName) => {
  originalDeviceName = deviceName;
  originalDeviceStatus = 'Connected';

  deviceNameField.textContent = originalDeviceName;
  deviceStatusField.textContent = originalDeviceStatus;
});

ipcRenderer.on('deviceDeactivated', () => {
  originalDeviceStatus = 'Disconnected';
  deviceStatusField.textContent = originalDeviceStatus;
});

ipcRenderer.on('cardReceived', (event, rfid) => {
  // deviceNameField.textContent = rfid;
});
console.log('👋 This message is being logged by "renderer.js", included via webpack');
