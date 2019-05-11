/* eslint-disable prefer-template */
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

const moment = require('moment');

const protocol = require('./udpProtocol');

const socket = datagram.createSocket('udp4');

class Musician {
  constructor(instrument) {
    // The uuid is generated a the musician creation
    this.uuid = uuidv4();

    // We keep a timestamp of the musician's creation
    this.timeCreation = moment();

    this.instrument = instrument;

    switch (this.instrument) {
      case 'piano':
        this.instrumentSound = 'ti-ta-ti';
        break;
      case 'trumpet':
        this.instrumentSound =  'pouet';
        break;
      case 'flute':
        this.instrumentSound = 'trulu';
        break;
      case 'violin':
        this.instrumentSound = 'gzi-gzi';
        break;
      case 'drum':
        this.instrumentSound = 'boum-boum';
        break;
      default:
        this.instrumentSound = '';
    }

    console.log('Sound: ' + this.instrumentSound);

    // Every second the musician will produce a sound
    setInterval(this.update.bind(this), 1000);
  }

  update() {
    const playSound = {
      uuid: this.uuid,
      instrumentSound: this.instrumentSound,
    };

    const payload = JSON.stringify(playSound);

    const message = Buffer.from(payload, 'utf-8');

    socket.send(message, 0, message.length, protocol.PROTOCOL_PORTS, protocol.MULTICAST_ADDRESS,
      function (err, bytes) {
      console.log('Sending payload: ' + payload + ' via port ' + socket.address().port + '\r\n'); // Debug
    });
  }
}

const arg = process.argv[2];

console.log(arg);

let mus = new Musician(arg);