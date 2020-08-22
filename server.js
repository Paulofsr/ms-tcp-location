var net = require('net');
var server = net.createServer();  
var axios = require('axios');
var hex2dec = require('hex2dec');
var settings = require('./config/settings');
var logger      = require('./config/logger')(require('./config/settings'));
const start = "50F7";
const end = "73C4";
const deviceLength = 6;
const cmTypeLength = 2; 
const ack = "01";
const ping = "50494E47";


server.on('connection', handleConnection);

server.listen(9000, function() {    
    logger.info('server listening to %j', server.address());  
});

function handleConnection(conn) {    
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
    logger.info('new client connection from %s', remoteAddress);

    conn.setEncoding('utf8');
    conn.on('data', onConnData);  
    conn.once('close', onConnClose);  
    conn.on('error', onConnError);

    function onConnData(package) {
        package = package.replace('\n', '');
        logger.info('connection data from %s: %j', remoteAddress, package);
        let preData = checkPackage(package);
        if(preData){
            logger.info('Command Type: ', preData.commandType);
            if(preData.commandType == "02"){
                sendPackage(preData);
            } else if(preData.commandType == ack){
                conn.write(`${start}${preData.deviceId_Hex}${ack}${ping}${end}\n`);  
            }
        }
    }

    function onConnClose() {  
        logger.info('connection from %s closed', remoteAddress);  
    }

    function onConnError(err) {  
        logger.error('Connection %s error: %s', remoteAddress, err.message);  
    }  
}


function checkPackage(package) {
        if(package && package.length >= (start.length + end.length + deviceLength + cmTypeLength)){
            let pStart = package.substring(0, start.length);
            let pEnd = package.substring(package.length - end.length);
            if(pStart == start && pEnd == end){
                return getPreData(package);
            }
        }
        logger.error(`INVALID PACKAGE: ${package}`);
        return null;
}

function getPreData(package){
    let subPackage = package.substring(start.length, package.length - end.length);
    logger.error(`Subpackage: ${subPackage}`);
    return {
        "deviceId_Hex": subPackage.substring(0, 6),
        "deviceId": hex2dec.hexToDec(subPackage.substring(0, 6)),
        "commandType": subPackage.substring(6, 8),
        "subPackage": subPackage.substring(8),
        "package": package
    };
}

function sendPackage(preData){
    let url = `http://${settings.apiURL}/v1/info`;
    axios.post(url, preData)
        .then(response => {
            if (response.status == 204) {
                logger.info('Sent!');
            } else {
                logger.info(response.data);
            }
        })
        .catch(error => {
            logger.error('ERROR when send data');
            logger.error(error);
        });
}