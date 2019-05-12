/**
 * Specifications of the default adress and port for the udp protocol.
 * Based on sensor-protocol.js by Olivier Liechti
 */

// Port used to accept incoming connections
exports.PROTOCOL_PORT = 2205;

// For receiving UDP datagram
exports.MULTICAST_PORT = 3205;

// Address in the administratively scoped multicast range
exports.MULTICAST_ADDRESS = '239.255.22.10';
