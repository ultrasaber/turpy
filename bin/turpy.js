const Discord = require('discord.js');
const fs = require('fs');
const vm = require('vm');
const util = require('util');                    

var turpy = require('./coreutils.js');
turpy.client = new Discord.Client();

turpy.log('[INFO] turpy is now loading.');
turpy.addHelpText("help", "Get help for this bot's loaded scripts.");

// scriptSandbox exposes things to external scripts.
const scriptSandbox = {
    turpy: turpy,
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
    turpy.client.login(token.trim());
});

// Read user-defined administrator IDs in config/admins.txt, which is a comma-delimited list.
fs.readFile('config/admins.txt', 'utf8', (error, adminString) => {
    if (error) throw error;
    turpy.admins = adminString.trim().split(',');
    turpy.log('[INFO] Bot administrators have been processed:');
    turpy.log(util.inspect(turpy.admins));
});

turpy.client.on('ready', () => {
    turpy.log('[READY] turpy is now ready.');

    turpy.admins.forEach((adminId) => {
        turpy.client.fetchUser(adminId).then(admin => admin.createDM().then(dmChannel => dmChannel.send(":white_check_mark: **Hello! Turpy has completed her initialization process.**")));
    });
});

// Help command.
turpy.client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command === 'help') {
        message.reply('```' + turpy.helpText + '```');
    }
});
