/*
  RES - Laboratoire Orchestra
  Student: Musician.js
  Date: 02.05.2019
  This code specify a musician.

  Based on thermometer.js by Olivier Liechti.
*/

// Standard node.js module to work with udp
const datagram = require('dgram');

const uuidv4 = require('uuid/v4');

const protocol = require('./udpProtocol');

// udp4 or udp6 ?
const socket = datagram.createSocket('udp4');

class Musician {
  constructor(instrument, timeStamp) {
    this.uuid = uuidv4();

    this.timeCreation = timeStamp;

    this.instrument = instrument;

    this.instrumentSound = function sound() {
      switch (this.instrument) {
        case 'piano':
          return 'ti-ta-ti';
        case 'trumpet':
          return 'pouet';
        case 'flute':
          return 'trulu';
        default:
          return '';
      }
    };
    setInterval(this.update.bind(this), 1000);
  }

  update() {
    const playSound = {
      uuid: this.uuid,
      instrument: this.instrument,
      activeSince: this.timeCreation,
    };

    const payload = JSON.stringify(playSound);

    const message = Buffer.from(payload, 'utf-8');

    socket.send(message, 0, message.length, protocol.PROTOCOL_PORTS, protocol.MULTICAST_ADDRESS, function(err, bytes) {
      console.log('Sending payload: ' + payload + ' via port ' + s.address().port + '\n'); // Debug
    });
  }
}
