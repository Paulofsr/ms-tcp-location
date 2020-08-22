var DateHelper = require('./dateHelper');
var HashHelper = require('./hashHelper');

module.exports = {
    getHelper: function (helper) {
        switch (helper) {
            case 'hash':
                return HashHelper;
            case 'date':
                return new DateHelper();
            default:
                return null;
        }
    }
};