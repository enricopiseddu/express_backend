const winston = require('winston');


const loggerInfo = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
  
    transports: [
        new winston.transports.File({ 
            filename: './logs/info.log',
            options: { flags: 'w' }, 
            level: 'info' 
        })
    ]
});


const loggerError = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    
    transports: [
        new winston.transports.File({ 
            filename: './logs/error.log',
            options: { flags: 'w' }, 
            level: 'error'   
        })
    ]
  });


module.exports = {loggerInfo, loggerError};