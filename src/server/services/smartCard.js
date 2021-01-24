const smartcard = require('smartcard');
const emitter = require('../events');

const { Devices } = smartcard;
const devices = new Devices();

devices.on('device-activated', (event) => {
  const { device } = event;
  emitter.emit('deviceActivated', device);
  console.log(`${device.name} is connected`);
  device.on('card-inserted', ({ card }) => {
    card
      .issueCommand('FFCA000000')
      .then(() => {})
      .catch(console.error);

    card.on('response-received', ({ response }) => {
      const rfid = response.getDataOnly();
      emitter.emit('cardReceived', rfid);
      console.log(rfid);
    });
    card.on('card-removed', () => {
      console.log('CARD_REMOVED');
      emitter.emit('cardRemoved');
    });
  });
});

devices.on('device-deactivated', (e) => {
  emitter.emit('deviceDeactivated');
  console.log(e);
});

devices.on('error', (e) => {
  emitter.emit('deviceDeactivated');
  console.log(e);
});
