turpy.addHelpText('ping', 'Pong.');

turpy.client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command === 'ping') {
        message.reply('pong');
    }
});
