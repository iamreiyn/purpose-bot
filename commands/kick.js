exports.run = async (client, message, args) => {
	if (!args[0]) return message.reply('Invalid format, please define a user ID to kick.');
	if (!args[1]) { args[1] = 'No reason specified';}
	const user = await message.guild.members.fetch(args[0]);
	if (!user) return message.reply('Unable to fetch the defined user.');
	user.kick(args[1]);
	message.reply('Successfully kicked the user from the server.');
};

exports.name = 'kick';