exports.run = (client, message, args) => {
	if (!args[0]) return message.reply('Incorrect way! please define a number');
	for (let i = 0; i <= args[0]; i++) {
		message.channel.send('' + i);
	}
	message.reply('Sucessfully counted to ' + args[0]);
};

exports.name = 'count';