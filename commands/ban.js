const { Permissions } = require('discord.js');

exports.run = async (client, message, args) => {
	if (!args[0]) return message.reply('Invalid format, please define a user ID to ban.');
	if (message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
		const user = await message.guild.members.fetch(args[0]);
		if (!args[1]) return args[1] = 'No reason specified.';
		if (user) {
			try {
				user.ban({ reason: args[1] });
				message.reply('Successfully banned the user from the discord server.');
			}
			catch {
				message.reply('I do not have permissions to ban');
			}
		}
		else {
			message.reply('You do not have permissions to ban');
		}
	}
};

exports.name = 'ban';