const Discord = require('discord.js');
const fs = require('fs');
const vm = require('vm');
const util = require('util');

var turpy = {};                       // Object for all core utility functions.
var admins;                           // Array of user IDs of administrators. Defined in config/admins.txt.
const client = new Discord.Client();

// Literally just a wrapper for console.log, but with timestamps.
turpy.log = function(string) {
    var timestamp = new Date();
    console.log("[" + timestamp.toUTCString() + "] " + string);
}

turpy.log('[INFO] turpy is now loading.');

// scriptSandbox exposes things to external scripts.
const scriptSandbox = {
    turpy: turpy,
    client: client,
    util: util,
    console: console,
    require: require
};
const scriptContext = new vm.createContext(scriptSandbox);

// External script loader. Reads all scripts found in the ./scripts directory and runs them under the above sandbox.
fs.readdir('scripts', (error, files) => {
    if (error) throw error;
    
    files.forEach((filename) => {
        var scriptPath = "scripts/" + filename;

        fs.readFile(scriptPath, 'utf8', (error, script) => {
            if (error) throw error;

            turpy.log('[SCRIPT] Read ' + scriptPath + '.');
            
            var vmScript = new vm.Script(script);
            vmScript.runInContext(scriptContext);
        });
    });
});

// Read auth token from config file and login as the bot user
fs.readFile('config/token.txt', 'utf8', (error, token) => {
    if (error) throw error;
    client.login(token.trim());
});

// Read user-defined administrator IDs in config/admins.txt, which is a comma-delimited list.
fs.readFile('config/admins.txt', 'utf8', (error, adminString) => {
    if (error) throw error;
    admins = adminString.trim().split(',');
    turpy.log('[INFO] Bot administrators have been processed:');
    turpy.log(util.inspect(admins));
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

    // Determines if a message is from a valid administrator.
    turpy.isAdministrator = function(message) {
        return admins.indexOf(message.author.id) !== -1;
    }

    turpy.log('[READY] turpy is now ready.');

    admins.forEach((adminId) => {
        client.fetchUser(adminId).then(admin => admin.createDM().then(dmChannel => dmChannel.send(":white_check_mark: **Hello! Turpy has completed her initialization process.**")));
    });
});

