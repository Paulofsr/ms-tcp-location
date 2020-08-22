
module.exports = {
    apiURL: process.env.LOCATION_API || 'localhost:5300',
    logging: {
        consoleLevel: process.env.LOGGING_CONSOLE_LEVEL || 'debug',
        fileLevel: process.env.LOGGING_FILE_LEVEL || 'debug',
        dbLebel: process.env.LOGGING_DB_LEVEL || 'debug',
        useDB: process.env.LOGGING_USE_DB === 'true',
        saveRequests: process.env.LOGGING_SAVE_REQUESTS === 'false'
    }
};