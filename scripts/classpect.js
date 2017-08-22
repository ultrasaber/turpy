turpy.addHelpText('classpect', 'Determines your classpect.');

client.on('message', message => {
    var command = turpy.getCommand(message.content);
    
    if (command === 'classpect')
    {
        var ID = message.author.id;
        
        var classArray = ['Maid', 'Page', 'Mage', 'Knight', 'Rogue', 'Sylph', 'Seer', 'Thief', 'Heir', 'Bard', 'Prince', 'Witch', 'Lord', 'Muse'];
        var aspectArray = ['Time', 'Breath', 'Doom', 'Blood', 'Heart', 'Space', 'Mind', 'Light', 'Void', 'Rage', 'Hope', 'Life'];
        
        var classUser = ID % classArray.length;
        var aspectUser = ID % aspectArray.length;
        
        message.reply('Your classpect has been determined to be the ' + classArray[classUser] + ' of ' + aspectArray[aspectUser] + '.');
    }

});
