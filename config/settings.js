
module.exports = {
    apiURL: process.env.LOCATION_API || 'http://localhost:5300',
    logging: {
        consoleLevel: process.env.LOGGING_CONSOLE_LEVEL || 'debug',
        fileLevel: process.env.LOGGING_FILE_LEVEL || 'debug',
        dbLebel: process.env.LOGGING_DB_LEVEL || 'debug',
        useDB: process.env.LOGGING_USE_DB === 'true',
        saveRequests: process.env.LOGGING_SAVE_REQUESTS === 'false'
    },
    infos: {
        start: "50F7",
        end: "73C4",
        deviceLength: 6,
        cmTypeLength: 2,
        ack: "01",
        ping: "50494E47"
    }
};