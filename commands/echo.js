exports.run = async (client, message, args) => {
	const isChannel = message.guild.channels.cache.get(args[0].substring(2).substring(0, 18));
	if (!isChannel) {
		const result = message.content.substring(5);
		message.channel.send(result);
		message.react('✅');
	}
	else if (isChannel) {
		const result = message.content.substring(27);
		isChannel.send(result);
		message.react('✅');
	}
};

exports.name = 'echo';