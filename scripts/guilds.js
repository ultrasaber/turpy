client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command) {
        if (turpy.isAdministrator(message)) {
            if (command === 'guilds') {
                var joinedGuilds = client.guilds.array().length;
                message.reply('Turpy is currently in ' + joinedGuilds + ' guild(s). Type `@turpy guilds list` for more information.');
            }

            if (command === 'guilds list') {
                var guilds = client.guilds.array();
                var output = '';

                guilds.forEach((guild) => {
                    output += '[' + guild.id + '] ' + guild.name + '\n';
                });

                message.reply('here is the current guild list:\n```' + output + '```');
            }

            if (command.match(/^guilds info (.*)/) !== null) {
                message.reply('Not implemented yet!');
            }

            if (command.match(/^guilds leave (.*)/) !== null) {
                message.reply('Not implemented yet!');
            }
        }
        else {
            message.reply('this command is reserved for administrators only.');
        }
    }
});
