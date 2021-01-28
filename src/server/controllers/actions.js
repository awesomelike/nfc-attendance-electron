const emitter = require('../events');

module.exports = (socket) => {
  socket.on('getDetails', () => {
    emitter.on('cardReceived', (rfid) => {
      try {
        socket.emit('professorRfid', rfid);
      } catch (error) {
        console.log(error);
        socket.emit('dataError', 'Professor not found or no classes right now!');
        emitter.removeAllListeners('cardReceived');
      }
    });
  });

  socket.on('startAttendance', () => {
    try {
      emitter.removeAllListeners('cardReceived');
      emitter.on('cardReceived', (studentRfid) => {
        socket.emit('attended', studentRfid);
      });
    } catch (error) {
      console.log(error.message);
      socket.emit('dataError', error.message);
    }
  });

  socket.on('finishAttendance', () => {
    try {
      emitter.removeAllListeners('cardReceived');
    } catch (error) {
      console.log(error.message);
      socket.emit('dataError', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnect');
    emitter.removeAllListeners('cardReceived');
  });
};
