/**
 * RES - Laboratoire Orchestra
 * Student: Musician.js
 * Date: 02.05.2019
 * 
 * This code specify a musician.
 * 
 * Based on thermometer.js by Olivier Liechti.
 */

 var protocol = require('./udpProtocol');

 // Standard node.js module to work with udp
 var datagram = require('dgram');

 var socket = datagram.createSocket('udp6'); // udp4 or udp6 ?