exports.run = async (client, message, args) => {
	if (!args[0]) return message.reply('Invalid format, please use -poll <question>');
	await message.channel.send(`${message.author} asks: ${args}`).then(function(reply) {
		reply.react('✅');
		reply.react('❌');
	}).catch(function() {
		// Something
	});
};

exports.name = 'poll';