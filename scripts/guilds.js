turpy.addHelpText('guilds', 'Shows guild information. Requires admin.');

turpy.client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command) {
        if (turpy.isAdministrator(message)) {
            if (command === 'guilds') {
                var joinedGuilds = turpy.client.guilds.array().length;
                message.reply('Turpy is currently in ' + joinedGuilds + ' guild(s). Type `@turpy guilds list` for more information.');
            }

            if (command === 'guilds list') {
                var guilds = turpy.client.guilds.array();
                var output = '';

                guilds.forEach((guild) => {
                    output += '[' + guild.id + '] ' + guild.name + '\n';
                });

                message.reply('here is the current guild list:\n```' + output + '```\nType `@turpy guilds info <id>` for more info.');
            }

            if (command.match(/^guilds info (.*)/) !== null) {
                var id = command.match(/^guilds info (.*)/)[1];
                var guild = turpy.client.guilds.get(id);

                var joinedDate = new Date();
                joinedDate.setTime(guild.joinedTimestamp);

                var guildOwner = guild.members.get(guild.ownerID).user;

                if (guild !== undefined) {
                    message.reply("here's what I could find: ```" +
                    'ID:            ' + guild.id + '\n' +
                    'Name:          ' + guild.name + '\n' +
                    'Region:        ' + guild.region + '\n' +
                    'Member Count:  ' + guild.memberCount + '\n' +
                    'Joined Date:   ' + joinedDate.toUTCString() + '\n' +
                    'Owner:         ' + guildOwner.username + '#' + guildOwner.discriminator + ' [ID: ' + guild.ownerID + ']' + 
                    "```");
                }
                else {
                    message.reply('enter a better guild ID!');
                }
            }

            if (command.match(/^guilds leave (.*)/) !== null) {
                var id = command.match(/^guilds leave (.*)/)[1];
                var guild = turpy.client.guilds.get(id);

                if (guild !== undefined) {
                    message.channel.send(':information_source: **Turpy is now leaving ' + guild.name + '. Goodbye!**')
                        .then(msg => guild.leave());
                }
                else {
                    message.reply('enter a better guild ID!');
                }
            }
        }
    }
});
