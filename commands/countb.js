exports.run = (client, message, args) => {
	if (!args[0]) return message.reply('Incorrect way! please define a number');
	for (let i = args[0]; i >= 0; i--) {
		message.channel.send('' + i);
	}
	message.reply('Sucessfully counted back from ' + args[0]);
};

exports.name = 'countb';