turpy.addHelpText('ping', 'Pong.');

client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command === 'ping') {
        message.reply('pong');
    }
});
