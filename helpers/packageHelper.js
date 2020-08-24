var axios       = require('axios');
var hex2dec     = require('hex2dec');
var settings    = require('../config/settings');
var logger      = require('../config/logger')(settings);


function getPreData(package){
    let subPackage = package.substring(settings.infos.start.length, package.length - settings.infos.end.length);
    logger.error(`Subpackage: ${subPackage}`);
    return {
        "deviceId_Hex": subPackage.substring(0, 6),
        "deviceId": hex2dec.hexToDec(subPackage.substring(0, 6)),
        "commandType": subPackage.substring(6, 8),
        "subPackage": subPackage.substring(8),
        "package": package
    };
}

module.exports = {
    checkPackage: function(package) {
        if(package && package.length >= (settings.infos.start.length + settings.infos.end.length + settings.infos.deviceLength + settings.infos.cmTypeLength)){
            let pStart = package.substring(0, settings.infos.start.length);
            let pEnd = package.substring(package.length - settings.infos.end.length);
            if(pStart == settings.infos.start && pEnd == settings.infos.end){
                return getPreData(package);
            }
        }
        logger.error(`INVALID PACKAGE: ${package}`);
        return null;
    },

    sendPackage: function(preData){
        let url = `${settings.apiURL}/api/v1/info`;
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
    },

    getACK: function(preData, hasKeyEnter){
        let keyEnter = hasKeyEnter ? '\n': '';
        return `${settings.infos.start}${preData.deviceId_Hex}${settings.infos.ack}${settings.infos.ping}${settings.infos.end}${keyEnter}`;
    }
}