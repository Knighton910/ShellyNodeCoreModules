// // load http module
// var http = require('http');
//
// // create http server
// http.createServer(function (req, res) {
//
//     // content header
//     res.writeHead(200, {'content-type' : 'text/plain'});
//
//     // write msg and signal communication is complete
//     res.end("Hello, World!\n");
// }).listen(8124);
//
// // logging which port were running on
// console.log('Server running on 8124 [hello world]');



// // TODO: delete from here and put in own module
// process.stdin.resume();
//
// process.stdin.on('data', function(chunk) {
//     process.stdout.write('data: ' + chunk);
// });


// // timer to open file and read contents to HTTP response object
// function on_OpenAndReadFile(filename, res) {
//     console.log('opening '+ filename);
//
//     // open and read in file contents
//     fs.readFile(filename, 'utf8', function(err, data) {
//         if (err)
//             res.write('Could not find or open file for reading\n');
//         else { res.write(data) }
//
//         // response is done
//         res.end();
//     })
// }
//
// setTimeout(openAndReadFile, 2000, filename, res);


// var net = require('net');
//
// var server = net.createServer(function(conn) {
//     console.log('connected');
//
//     conn.on('data', function(data) {
//         console.log(data + ' from ' + conn.remoteAddress + ' ' + conn.remotePort);
//         conn.write('Repeating: ' + data);
//     });
//
//     conn.on('close', function() {
//         console.log('client closed connection');
//     });
// }).listen(8124);
//
// console.log('listening on port 8124');


// const net = require('net');
//
// const client = new net.Socket();
// client.setEncoding('utf8');
//
// // connect to server
// client.connect('8124', 'localhost', function() {
//     console.log('connected to server');
//     client.write('Who needs a browser to communicate?');
// });
//
// // prepare for input from terminal
// process.stdin.resume();
//
// // when receive data, send to server
// process.stdin.on('data', function(data) {
//     client.write(data);
// });
//
// // when receive data back, print to console
// client.on('data', function(data) {
//     console.log(data);
// });
//
// // when server closed
// client.on('close', function() {
//     console.log('connection is closed');
// });


// TODO: HTTP server bound to a Unix socket
// create server and callback function
// var http = require('http');
// var fs = require('fs');
//
// http.createServer(function (req, res) {
//
//     var query = require('url').parse(req.url).query;
//     console.log(query);
//     file = require('querystring').parse(query).file;
//
//     // content header
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//
//     // increment global , write to client
//     for (var i = 0; i<100; i++) {
//         res.write(i + '\n');
//     }
//
//     // open and read in file contents
//     var data = fs.readFileSync(file, 'utf8');
//     res.write(data);
//     res.end();
// }).listen('/tmp/node-server-sock');



// // TODO: Connecting to the Unix socket and printing out received data
// var http = require('http');
//
// var options = {
//     method: 'GET',
//     socketPath: '/tmp/node-server-sock',
//     path: "/?file=main.txt"
// };
//
// var req = http.request(options, function(res) {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         console.log('chunk o\' data: ' + chunk);
//     });
// });
//
// // error handler / notifier
// req.on('error', function(e) {
//     console.log('problem with request: ' + e.message);
// });
//
// // write data to request body
// req.write('data\n');
// req.write('data\n');
// req.end();


// Using Readline to create a simple, command-driven user interface

// create a new interface
// var _interface = readline.createInterface(process.stdin, process.stdout, null);
//
// // ask question
// _interface.question('>>What is the meaning of life? ', function(answer) {
//     console.log('About the meaning of life, you said ' + answer);
//     _interface.setPrompt('>>');
//     _interface.prompt();
// });
//
// // function to close interface
// function closeInterface() {
//     console.log('Leaving interface...');
//     process.exit();
// }
//
// // listen for .leave6
// _interface.on('line', function(cmd) {
//     if (cmd.trim() == '.leave') {
//         closeInterface();
//         return;
//     } else {
//         console.log("repeating command: " + cmd);
//     }
//     _interface.setPrompt('>>');
//     _interface.prompt();
// });var readline = require('readline');

// _interface.on('close', function () {
//     closeInterface();
// });

// child_process.spawn
// var spawn = require('child_process').spawn,
//     pwd = spawn('pwd');
//
// pwd.stdout.on('data', function(data) {
//     console.log('stdout: ' + data);
// });
//
// pwd.stderr.on('data', function(data) {
//     console.log('stderr: ' + data);
// });
//
// pwd.on('exit', function(code) {
//     console.log('child process exited with code ' + code);
// });

// Using child processes to find files in subdirectories with a given search term, 'test
// var spawn = require('child_proecess').spawn,
//     find = spawn('find', ['.','-ls']),
//     grep = spawn('grep',['test']);
//
// grep.stdout.setEncoding('utf8');
//
// //direct results of find to grep
// find.stdout.on('data', function(data) {
//     grep.stdin.write(data);
// });
//
// // now run grep and output results
// grep.stdout.on('data', function(data) {
//     console.log(data);
// });
//
// // error handling for both
// find.stderr.on('data', function(data) {
//     console.log('grep stderr: ' + data);
// });
// grep.stderr.on('data', function(data) {
//     console.log('grep stderr: '+ data);
// });

// and exit handling for both
// find.on('exit', function(code) {
//     if (code !== 0) {
//         console.log('find process exited with code ' + code);
//     }
//
//     // go ahead and end greq process
//     grep.stdin.end();
// });
//
// grep.on('exit', function(code) {
//     if ( code !== 0) {
//         console.log('grep process exited with code ' + code);
//     }
// });

var util = require('util');

// define original object
function first() {
    var self = this;
    this.name = 'first';
    this.test = function() {
        console.log(self.name);
    };
}

first.prototype.output = function() {
    console.log(this.name);
}

// inherit from first
function second() {
    second.super_.call(this);
    this.name = 'second';
}
util.inherits(second, first);

var two = new second();

function third(func) {
    this.name = 'third';
    this.callMethod = func;
}

var three = new third(two.test);

// [callsite 3x] all three should output 'second'
two.output();
two.test();
three.callMethod();


