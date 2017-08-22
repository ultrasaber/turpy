const BOT_PERMISSIONS = 0;
const ALLOW_PUBLIC_INVITES = false;

turpy.addHelpText('invite', 'Get an invite link for this bot.');

turpy.client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command === 'invite') {
        if (turpy.isAdministrator(message) || ALLOW_PUBLIC_INVITES) {
            var inviteLink = 'https://discordapp.com/oauth2/authorize?client_id=' + turpy.client.user.id + '&scope=bot&permissions=' + BOT_PERMISSIONS; 

            message.author.createDM().then(dmChannel => dmChannel.send("**Sure! Here's your invite link:**\n" + inviteLink));
        } 
        else {
            message.author.createDM().then(dmChannel => dmChannel.send(":secret: **This bot's administrator has disabled public invites.**"));
        }

    }
});
