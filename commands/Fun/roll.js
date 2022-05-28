exports.run = async (client, message, args) => {

	function randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	if (args[0]) {
		const myArray = args[0].split('-');
		const min = parseInt(myArray[0]);
		const max = parseInt(myArray[1]);
		if (!randomInteger(min, max).isNan && max > min) {
			message.channel.send(`**${message.author.username}** rolls **${randomInteger(min, max)}** out of (${min}-${max})`);
		}
		else {
			message.reply('Invalid usage, please use -roll <min-max> or the default values (0-100) will be used.');
		}
	}
	else if (!args[0]) {
		message.channel.send(`**${message.author.username}** rolls **${randomInteger(0, 100)}** out of (0-100)`);
	}
};