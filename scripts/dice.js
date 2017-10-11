const MAXIMUM_ROLLS = 100;
const MAXIMUM_SIDES = 300;

turpy.addHelpText('roll XdY', 'Roll some dice.');

function rollDice(dice, sides) {
    if ((dice > MAXIMUM_ROLLS) || (sides > MAXIMUM_SIDES)) {
        return "*no.*";
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

        return ":game_die: You rolled **" + total + "**:" + output;
    }
}

turpy.client.on('message', message => {
    var command = turpy.getCommand(message.content);

    if (command) {
        if (command.match(/^roll ([0-9]+)d([0-9]+)$/) !== null) {
            var parsedCommand = command.match(/^roll ([0-9]+)d([0-9]+)/);
            message.reply(rollDice(parsedCommand[1], parsedCommand[2]));
        }

        if (command.match(/^roll ([0-9]+)$/) !== null) {
            var parsedCommand = command.match(/^roll ([0-9]+)/);
            message.reply(rollDice(1, parsedCommand[1]));
        }
    }
});
