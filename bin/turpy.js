const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
  console.log('https://discordapp.com/oauth2/authorize?client_id=336477550811414539&scope=bot&permissions=0');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

// Read auth token from config file and login as the bot user
fs.readFile('config/token.txt', 'utf8', (error, token) => {
    if (error) throw error;
    client.login(token);
});