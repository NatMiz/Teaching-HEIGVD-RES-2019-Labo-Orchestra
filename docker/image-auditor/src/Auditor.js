/**
 * RES - Laboratoire Orchestra
 * Student: Musician.js
 * Date: 02.05.2019
 */

 const net  = require('net');

 const dgram = require('dgram');

 const s = dgram.createSocket('up4');

 const protocol = require('./udpProtocol');

// We bind the new server to the port specified by the protocol
 const server = net.createServer();

 const moment = require('moment');

 class Auditor {
     constructor() {
        this.musicians = new Map();

        this.instrument = new Map();
        instrument.set('ti-ta-ti', 'piano');
        instrument.set('pouet', 'trumpet');
        instrument.set('trulu', 'flute');
        instrument.set('gzi-gzi', 'violin');
        instrument.set('boum-boum', 'drum');
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

    toString() {
        let iter = this.musicians.values();

        array = new Array(this.musicians.size());

        for(let i = 0; i < this.musicians.size(); i++) {
            array[i] = iter.next().value;
        }

        return array;
    }
}

 let auditor = new Auditor();

 server.listen(protocol.PROTOCOL_PORT);

 server.on('connection', function(socket) {

    socket.write(musicians);  // TODO send an array

    server.on('close', function(socket) {
        socket.send('\r\n');

        socket.close();
    });
   
    server.on('error', function() {
        console.log('Error: ${err}');
    });
 });

 // When we receive a UDP datagram
 server.on('message', function(msg, socket){
    let data = JSON.parse(msg);

    auditor.update(data.uuid);

    const content = {
        uuid: id,
        instrument: auditor.getInstrument(data.instrumentSound),
        activeSince: creationTime,
    }

    const payload = JSON.stringify(content);

    const message = Buffer.from(payload, 'utf-8');

    s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.MULTICAST_ADDRESS,
        function(error, bytes) {
            console.log('Error: ${err}\nBytes: ${bytes}');
        });
});
