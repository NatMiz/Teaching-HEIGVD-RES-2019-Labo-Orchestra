/**
 * RES - Laboratoire Orchestra
 * Student: Musician.js
 * Date: 02.05.2019
 */

 const protocol = require('./udpProtocol');

 const datagram = require('dgram');

 const socket = datagram.createSocket('udp4');

 const moment = require('moment');

 class Auditor {
     constructor() {
        this.musicians = new Map();
     }
 }

 socket.bind(protocol.PROTOCOL_PORTS,socket.addMembership(protocol.MULTICAST_ADDRESS));

 socket.on('message', function(msg, source){
    
 });