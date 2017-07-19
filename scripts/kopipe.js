const util = require('util');

client.on('ready', () => {
    console.log(util.inspect("Hello World!"));
});