const MAXIMUM_ROLLS = 100;
const MAXIMUM_SIDES = 300;

turpy.addHelpText('roll XdY', 'Roll some dice.');

client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command) {
        if (command.match(/^roll ([0-9]+)d([0-9]+)/) !== null) {
            var parsedCommand = command.match(/^roll ([0-9]+)d([0-9]+)/);

            var dice = parsedCommand[1];
            var sides = parsedCommand[2];

            if ((dice > MAXIMUM_ROLLS) || (sides > MAXIMUM_SIDES)) {
                message.reply("*no.*");
            }
            else {
                var total = 0;
                var output = " (";

                for(var i = 0; i < dice; i++) {
                    var roll = Math.floor((Math.random() * sides) + 1);

                    output += roll + ((i < (dice-1)) ? " + " : "");

                    total += roll;
                }

                output += ")";

                message.reply(":game_die: You rolled **" + total + "**:" + output);
            }
        }
    }
});
