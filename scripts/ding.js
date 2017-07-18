client.on('message', message => {
  if (message.content === 'ding') {
    message.reply('dong');
  }
});