const Discord = require('discord.js');
const fs = require('fs');
const vm = require('vm');
const util = require('util');

const client = new Discord.Client();

console.log('[INFO] turpy is now loading.');

// Object for core utilities.
var turpy = {};

// External script loader. Reads all scripts found in the ./scripts directory and runs them.

// scriptSandbox exposes things to external scripts.
const scriptSandbox = {
    turpy: turpy,
    client: client,
    util: util,
    console: console
};
const scriptContext = new vm.createContext(scriptSandbox);

fs.readdir('scripts', (error, files) => {
    if (error) throw error;
    
    files.forEach((filename) => {
        var scriptPath = "scripts/" + filename;

        fs.readFile(scriptPath, 'utf8', (error, script) => {
            if (error) throw error;

            console.log('[SCRIPT] Read ' + scriptPath + '.');
            
            var vmScript = new vm.Script(script);
            vmScript.runInContext(scriptContext);
        });
    });
});

// Read auth token from config file and login as the bot user
fs.readFile('config/token.txt', 'utf8', (error, token) => {
    if (error) throw error;
    client.login(token);
});

client.on('ready', () => {
    // Load core functions.

    // Evaluates if a given string follows the proper command syntax.
    // The proper syntax is "<@[user_id]> [arguments]".
    // Returns [arguments] if the message is a proper command, returns false if not.
    turpy.getCommand = function(messageContent) {
        var formatExpression = new RegExp('^<@' + client.user.id + '> ');
        var followsFormat = formatExpression.test(messageContent);

        if(followsFormat) {
            return messageContent.replace(formatExpression, '');
        }
        else {
            return false;
        }
    };

    console.log('[READY] turpy is now ready.');
    console.log('[INFO] Invite link: https://discordapp.com/oauth2/authorize?client_id=336477550811414539&scope=bot&permissions=0');
});
