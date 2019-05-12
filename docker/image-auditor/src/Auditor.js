/**
 * RES - Laboratoire Orchestra
 * Student: Musician.js
 * Date: 02.05.2019
 */

 const net  = require('net');

 const dgram = require('dgram');

 const socket = dgram.createSocket('udp4');

 const protocol = require('./udpProtocol');

// We bind the new server to the port specified by the protocol
 const server = net.createServer();

 const moment = require('moment');

 class Auditor {
     constructor() {
        this.musicians = new Map();

        this.instrument = new Map();
        this.instrument.set('ti-ta-ti', 'piano');
        this.instrument.set('pouet', 'trumpet');
        this.instrument.set('trulu', 'flute');
        this.instrument.set('gzi-gzi', 'violin');
        this.instrument.set('boum-boum', 'drum');
     }

     update(id){
        this.musicians.set(id, moment());
    }

    checkMusicians() {
        this.musicians.forEach(function(value, key, map){
            if(!moment(map.get(key)).isBetween(moment().subtract(5, "seconds"), moment())){
                map.delete(key);
            }
        });
    }

    getInstrument(sound) {
        return this.instrument.get(sound);
    }

    toStringArray() {

        let iter = this.musicians.values();

        let array = new Array(this.musicians.size);

        for(let i = 0; i < this.musicians.size; i++) {
            array[i] = iter.next().value;
        }

        return '[' + array.toString() + ']';
    }
}

 let auditor = new Auditor();

 socket.bind(protocol.MULTICAST_PORT, function(){
     console.log('Joining multicast group\r\n');
    socket.addMembership(protocol.MULTICAST_ADDRESS);
 });

 server.listen(protocol.PROTOCOL_PORT, function() {
     console.log('Server listening on ' + protocol.PROTOCOL_PORT);
 });

 server.on('connection', function(sourceSocket) {

    console.log('Connection received\r\n');

    // Send an array
    sourceSocket.write(auditor.toStringArray(), 'utf-8');
    sourceSocket.write('\r\n', 'utf-8');

    // Close the connection
    sourceSocket.end();

    /*
    server.on('close', function(socket) {
        socket.send('\r\n');
        socket.close();
    });
    */
   
    server.on('error', function() {
        console.log('Error: ${err}');
    });
 });

 // When we receive a UDP datagram
 socket.on('message', function(msg, sourceSocket){
    console.log('Datagram received\r\n' + msg);

    let data = JSON.parse(msg);

    auditor.update(data.uuid);

    const content = {
        uuid: id,
        instrument: auditor.getInstrument(data.instrumentSound),
        activeSince: creationTime,
    }
    const payload = JSON.stringify(content);
    const message = Buffer.from(payload, 'utf-8');

    socket.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.MULTICAST_ADDRESS,
        function(error, bytes) {
            console.log('Error: ${err}\nBytes: ${bytes}');
        });
});
