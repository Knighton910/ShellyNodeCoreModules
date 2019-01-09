// Using a session cookie to track resouce accesses
var connect = require('connect')
    ,http = require('http');

// clear all session data
function clearSession(req, res, next) {
     if ('/clear' === req.url) {
          req.session = null;
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
     } else {
          next();
     }
}

// track user
function trackUser(req, res, next) {
     req.session.ct = req.session.ct || 0;
     req.session.username = req.session.username || req.cookies.username;
     console.log(req.cookies.username + ' requested '
     + req.session.ct++ + ' resources this session');
     next();
}

// cookie & session
var app = connect()
    .use(connect.logger('dev'))
    .use(connect.cookieParser('mumble'))
    .use(connect.cookieSession({key : 'tracking'}))
    .use(clearSession)
    .use(trackUser)

// static Server
app.use(connect.static('/home/examples/public_html'));
// start server and listen
http.createServer(app).listen(8124);
console.log('Running @ port: 8124')

// Accessing an HTTP request cookie, and using it for a console msg
// var connect = require('connect')
//     ,http = require('http');
//
// var app = connect()
//     .use(connect.logger('dev'))
//     .use(connect.cookieParser())
//     .use(function(req, res, next) {
//          console.log('tracking ' + req.cookies.username);
//          next();
//     })
//     .use(connect.static('/home/examples/public_html'));
//
// http.createServer(app).listen(8124);
// console.log('Server listening on port 8124');



// setting logging to a file and changing logger format
// var connect = require('connect'),
//     http = require('http'),
//     fs = require('fs'),
//     __dirname = '/home/examples';
//
// var writeStream = fs.createWriteStream('./log.txt',
//     {'flags' : 'a',
//      'encoding' : 'utf8',
//      'mode' : '0666'});
//
// http.createServer(connect()
//     .use(connect.logger({format : 'dev', stream : writeStream}))
//     .use(connect.static(__dirname + '/public_html'))
// ).listen(8124);

// var connect = require('connect'),
//     http = require('http'),
//     __dirname = '/home/examples';
//
// http.createServer(connect()
//     .use(connect.logger())
//     .use(connect.static(__dirname + '/public_html'), {redirect: true})
// ).listen(8124);


// var connect = require('connect');
// var http = require('http');
//
// var app = connect()
//     .use(connect.favicon())
//     .use(connect.logger())
//     .use(function(req,res) {
//         res.end('Hello World\n');
//     });
//
// http.createServer(app).listen(8124);


// var http = require('http'),
//     url =  require('url'),
//     fs =   require('fs'),
//     mime = require('mime'),
//     base = '/home/examples/public_html';
//
// http.createServer(function (req, res) {
//
//     pathname = base + req.url;
//     console.log(pathname);
//
//     fs.stat(pathname, function(err, stats) {
//         if (err) {
//             res.writeHead(404);
//             res.write('Bad request 404\n');
//             res.end();
//         } else if (stats.isFile()) {
//             // content type
//             var type = mime.lookup(pathname);
//             console.log(type);
//             res.setHeader('Content-Type', type);
//
//             // 200 status - found, no errors
//             res.statusCode = 200;
//
//             // create and pipe readable stream
//             var file = fs.createReadStream(pathname);
//             file.on('open', function() {
//
//                 file.pipe(res);
//             });
//             file.on('error', function(err) {
//                 console.log(err);
//             });
//         } else {
//             res.writeHead(403);
//             res.write('Directory access is forbidden');
//             res.end();
//         }
//     });
// }).listen(8124);
// console.log('Server running @ 8124/');


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
