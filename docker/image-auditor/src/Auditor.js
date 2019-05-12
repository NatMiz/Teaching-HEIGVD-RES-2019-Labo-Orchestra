/**
 * RES - Laboratoire Orchestra
 * Student: Musician.js
 * Date: 02.05.2019
 */

 var net  = require('net');
 var dgram = require('dgram');
 const moment = require('moment');
 const protocol = require('./udpProtocol');

 const socket = dgram.createSocket('udp4');
 let musicians = new Map();

 const server = net.createServer(function(sourceSocket) {

    console.log('Connection received\r\n');

    // Send an array
    sourceSocket.write(JSON.stringify(musicians), 'utf-8');
    sourceSocket.write('\r\n', 'utf-8');

    // Close the connection
    sourceSocket.end();

 }).listen(protocol.PROTOCOL_PORT, function(sourceSocket) {
    console.log('Server listening on ' + protocol.PROTOCOL_PORT);
});

server.on('error', function() {
    console.log('Error: ${err}');
});

 socket.bind(protocol.MULTICAST_PORT, function(){
     console.log('Joining multicast group on ' + protocol.MULTICAST_ADDRESS +'\r\n');
    socket.addMembership(protocol.MULTICAST_ADDRESS);
 });

 // When we receive a UDP datagram
 socket.on('message', function(msg, sourceSocket){
    console.log('Datagram received: ' + msg + ' from source port: ' + sourceSocket.port);

    let data = JSON.parse(msg);

    let musician = {
        uuid: data.uuid,
        instrument: data.instrument,
        activeSince: data.creation,
        timestamp: moment(),
    }
    musicians.set(data.uuid, musician);
});

setInterval(function() {
    musicians.forEach(function(value, key, map) {
        if(!moment(map.get(key)).isBetween(moment().subtract(5, "seconds"), moment())){
            map.delete(key);
        }
    })
});
