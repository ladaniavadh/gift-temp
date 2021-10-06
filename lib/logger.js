var bunyan = require('bunyan')

var logger = bunyan.createLogger({
  name: 'myapp',
  streams: [
    {
      level: 'info',
      stream: process.stdout // log INFO and above to stdout
    },
    {
      level: 'error',
      stream: process.stdout // log ERROR and above to a file //nodemon | .\node_modules\.bin\bunyan
    }
  ]
});

module.exports = logger