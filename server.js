var net             = require('net');
var server          = net.createServer();  
var logger          = require('./config/logger')(require('./config/settings'));
var serverHelper    = require('./helpers/serverHelper');


server.on('connection', serverHelper.handleConnection);

server.listen(9000, function() {    
    logger.info('server listening to %j', server.address());  
});