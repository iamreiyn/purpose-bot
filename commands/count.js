exports.run = (client, message, args) => {
	if (!args[0]) return message.reply('Incorrect way! please define a number');
	if (args[0] > 200) return message.reply('I cannot count any higher than 200');
	for (let i = 0; i <= args[0]; i++) {
		message.channel.send('' + i);
	}
	message.reply('Sucessfully counted to ' + args[0]);
};

exports.name = 'count';