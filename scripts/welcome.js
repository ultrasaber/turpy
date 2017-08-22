// Displays a welcome message for new users.

client.on('guildMemberAdd', member => {
  member.guild.defaultChannel.send(`${member}, welcome to ${member.guild.name}! Enjoy your stay.`);
});
