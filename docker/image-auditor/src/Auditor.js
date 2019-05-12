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
 const musicians = new Map();

 const server = net.createServer(function(sourceSocket) {

    console.log('Connection received\r\n');

    let iter = musicians.values();

    for(i = 0; i < musicians.size; i++){
        let infos = iter.next().value;

        let payload = {
            uuid: infos.uuid,
            instrument: infos.instrument,
            activeSince: infos.activeSince,
        }

        sourceSocket.write(JSON.stringify(payload));
    }
    
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
    musicians.set(musician.uuid, musician);
});

setInterval(function() {
    musicians.forEach(function(value, key, map) {
        if(moment().subtract(map.get(key).timestamp) > 5000){
            map.delete(key);
        }
    })
}, 10000);
