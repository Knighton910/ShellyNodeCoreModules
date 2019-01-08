// const http = require('http');
//
// // The url we want, plus the path and options we need
// const options = {
//     host: 'localhost',
//     port: 8124,
//     path: '/?file=secondary',
//     method: 'GET'
// };
//
// const processPublicTimeline = function(response) {
//
//     //finished? ok, write the data to a file
//     console.log('finished request');
// };
//
// for (let i=0; i < 2000; i++) {
//
//     // make the request, and then end it, to close the connection
//     http.request(options, processPublicTimeline).end();
// }

// var globalValue;
//
// module.exports.setGlobal = function(val) {
//     globalValue = val;
// };
//
// module.exports.returnGlobal = function() {
//     console.log(global);
//     return globalValue;
// };

var eventEmitter = require('events').EventEmitter;
var counter = 0;

var em = new eventEmitter()

setInterval(function(){em.emit(33, counter++);},3000);

em.on(33, function(data) {
    console.log('Num 33 ' + data);
});
