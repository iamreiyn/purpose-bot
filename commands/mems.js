exports.run = async (client, message) => {
	const server = message.guild;
	const membersCount = server.memberCount;
	message.channel.send('Server Members: ' + membersCount);
};

exports.name = 'mems';