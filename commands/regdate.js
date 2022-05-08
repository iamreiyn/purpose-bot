exports.run = (client, message) => {
	const taggedUser = message.mentions.users.first();
	if (!taggedUser) return message.reply('Invalid format, please mention a user.');
	message.channel.send(`User **${taggedUser.username}** registered on ${taggedUser.createdAt.toLocaleString()} (Indian Standard Time)`).catch(console.error);
};

exports.name = 'regdate';