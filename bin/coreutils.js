const Discord = require('discord.js');
const fs = require('fs-extra');

module.exports.client = false;
module.exports.admins = false;  // Array of user IDs of administrators. Defined in config/admins.txt.

// Literally just a wrapper for console.log, but with timestamps.
module.exports.log = function(string) {
    var timestamp = new Date();
    console.log("[" + timestamp.toUTCString() + "] " + string);
}

// Evaluates if a given string follows the proper command syntax.
// The proper syntax is "<@[user_id]> [arguments]".
// Returns [arguments] if the message is a proper command, returns false if not.
module.exports.getCommand = function(messageContent) {
    var formatExpression = new RegExp('^<@' + module.exports.client.user.id + '> ');
    var followsFormat = formatExpression.test(messageContent);

    if(followsFormat) {
        return messageContent.replace(formatExpression, '');
    }
    else {
        return false;
    }
};

// Determines if a message is from a valid administrator.
module.exports.isAdministrator = function(message) {
    return module.exports.admins.indexOf(message.author.id) !== -1;
}

// Command help functionality.
module.exports.helpText = "";

module.exports.addHelpText = function (commandName, description) {
    module.exports.helpText += "\n" + commandName + " - " + description;
}

// JSON data functionality.
module.exports.readJSONData = function (dir, file, callback) {
    var path = dir + "/" + file;

    fs.ensureDir(dir, (error) => {
        if (error) throw error;
        fs.readFile(path, 'utf8', (error, contents) => {
            if (error) throw error;
            callback(JSON.parse(contents));
        });
    });
}

module.exports.writeJSONData = function (dir, file, object, callback) {
    var path = dir + "/" + file;

    fs.ensureDir(dir, (error) => {
        if (error) throw error;
        fs.open(path, 'w', (error, fd) => {
            if (error) throw error;
            fs.writeFile(fd, JSON.stringify(object), (error) => {
                if (error) throw error;
            });
    
            fs.close(fd, callback);
        });
    });
}

// Abstractions for reading/writing JSON data.
module.exports.readGlobalData = function () {}
module.exports.readGuildData = function () {}
module.exports.readUserData = function () {}
module.exports.readGuildUserData = function () {}

module.exports.writeGlobalData = function () {}
module.exports.writeGuildData = function () {}
module.exports.writeUserData = function () {}
module.exports.writeGuildUserData = function () {}
