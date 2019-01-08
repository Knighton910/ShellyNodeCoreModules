var http = require('http'),
    url =  require('url'),
    fs =   require('fs'),
    mime = require('mime'),
    base = '/home/examples/public_html';

http.createServer(function (req, res) {

    pathname = base + req.url;
    console.log(pathname);

    fs.stat(pathname, function(err, stats) {
        if (err) {
            res.writeHead(404);
            res.write('Bad request 404\n');
            res.end();
        } else if (stats.isFile()) {
            // content type
            var type = mime.lookup(pathname);
            console.log(type);
            res.setHeader('Content-Type', type);

            // 200 status - found, no errors
            res.statusCode = 200;

            // create and pipe readable stream
            var file = fs.createReadStream(pathname);
            file.on('open', function() {

                file.pipe(res);
            });
            file.on('error', function(err) {
                console.log(err);
            });
        } else {
            res.writeHead(403);
            res.write('Directory access is forbidden');
            res.end();
        }
    });
}).listen(8124);
console.log('Server running @ 8124/');


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

// var eventEmitter = require('events').EventEmitter;
// var counter = 0;
//
// var em = new eventEmitter()
//
// setInterval(function(){em.emit(33, counter++);},3000);
//
// em.on(33, function(data) {
//     console.log('Num 33 ' + data);
// });
