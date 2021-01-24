const emitter = require('../events');

export default (socket) => {
  socket.on('getDetails', () => {
    emitter.on('cardReceived', (rfid) => {
      console.log('Received professor card');
      try {
        socket.emit('professorRfid', rfid);
        console.log('emitted prof rfid');

        // emitter.removeAllListeners('cardReceived');
      } catch (error) {
        console.log(error);
        socket.emit('dataError', 'Professor not found or no classes right now!');
        emitter.removeAllListeners('cardReceived');
      }
    });
  });

  socket.on('startAttendance', () => {
    console.log('startAttendance');
    try {
      emitter.removeAllListeners('cardReceived');
      emitter.on('cardReceived', (studentRfid) => {
        console.log('Received student card');

        socket.emit('attended', studentRfid);
        console.log('attended emitted!');
      });
    } catch (error) {
      console.log(error.message);
      socket.emit('dataError', error.message);
    }
  });

  socket.on('finishAttendance', (classData) => {
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
