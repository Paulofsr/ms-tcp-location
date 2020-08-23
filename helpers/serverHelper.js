
var settings = require('../config/settings');
var logger      = require('../config/logger')(settings);
var packageHelper = require('./packageHelper');

module.exports = {
    handleConnection: function(conn) {    
        var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
        logger.info('new client connection from %s', remoteAddress);
    
        conn.setEncoding('utf8');
        conn.on('data', onConnData);  
        conn.once('close', onConnClose);  
        conn.on('error', onConnError);
    
        function onConnData(package) {
            logger.info(`Connection data from ${remoteAddress}`);

            let hasEnter = package.indexOf('\n') >= 0;
            package = package.replace('\n', '');
            let preData = packageHelper.checkPackage(package);

            logger.info(`Package: ${package}`);

            if(preData){
                logger.info(`Command Type: ${preData.commandType}`);
                
                if(preData.commandType == "02"){
                    packageHelper.sendPackage(preData);
                } else if(preData.commandType == settings.infos.ack){
                    conn.write(packageHelper.getACK(preData, hasEnter));  
                }

            }
        }
    
        function onConnClose() {  
            logger.info(`Connection from ${remoteAddress} closed`);  
        }
    
        function onConnError(err) {  
            logger.error(`Connection ${remoteAddress} error: ${err.message}`);  
        }  
    }
};