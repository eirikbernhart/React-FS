



/*import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');


function subscribeToTimer(callback) {
    socket.on('timer', timestamp => callback(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
} 

function pushToServer(data ,callback) {
    socket.on('pushToInspirationsListPush', pushedItem => callback(null, pushedItem));
    socket.emit('subscribeToTimer', 1000);
} 

function subscribeToInspirationListPull(data ,callback) {
    socket.on('pushToInspirationsListPull', pushedItem => callback(null, pushedItem));
    socket.emit('subscribeToTimer', 1000);
} 
export { subscribeToTimer, pushToServer }*/