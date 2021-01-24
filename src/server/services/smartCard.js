const smartcard = require('smartcard');
const emitter = require('../events');

const { Devices } = smartcard;
let devices = new Devices();

require('dotenv').config();

devices.on('device-activated', (event) => {
  const { device } = event;
  emitter.emit('deviceActivated', device);
  console.log(`${device.name} is connected`);
  device.on('card-inserted', (event) => {
    const { card } = event;
    card
      .issueCommand('FFCA000000')
      .then(() => {
      }).catch((error) => {
        console.error(error);
      });

    card.on('response-received', async (event) => {
      const rfid = event.response.getDataOnly();
      console.log(rfid);
      emitter.emit('cardReceived', rfid);
    });
  });
});

devices.on('device-deactivated', (e) => {
  emitter.emit('deviceDeactivated');
  devices = new Devices();
  console.log(e);
});

devices.on('error', (e) => {
  devices = new Devices();
  emitter.emit('deviceDeactivated');
  console.log(e);
});
