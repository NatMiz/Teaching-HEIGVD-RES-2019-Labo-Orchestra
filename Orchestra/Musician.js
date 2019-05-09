/*
  RES - Laboratoire Orchestra
  Student: Musician.js
  Date: 02.05.2019
  This code specify a musician.

  Based on thermometer.js by Olivier Liechti.
*/

// Standard node.js module to work with udp
var datagram = require('dgram');

const uuidv4 = require('uuid/v4');

var protocol = require('./udpProtocol');

// udp4 or udp6 ?
var socket = datagram.createSocket('udp4'); 

function Musician(instrument, timeStamp) {
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

  Musician.prototype.update = function () {

  var playSound = {
    uuid: this.uuid,
    instrument: this.instrument,
    activeSince: this.timeCreation
  };

  var payload = JSON.stringify(playSound);

  message = new Buffer(payload);

  socket.send(message, 0, message.length, protocol.PROTOCOL_PORTS, protocol.MULTICAST_ADDRESS, function(err, bytes){
    console.log("Sending payload: " + payload + " via port " + s.address().port); // DEbug
  });
}

  setInterval(this.update.bind(this), 1000);
}
