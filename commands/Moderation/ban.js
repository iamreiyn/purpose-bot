const { Permissions } = require('discord.js');

exports.run = async (client, message, args) => {
	message.guild.members.fetch(process.env.CLIENTID).then(function(bot) {
		if (message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
			if (!args[0]) return message.reply('Invalid format, please define a user ID to ban.');
			message.mentions.members.first() || message.guild.members.fetch(args[0]).then(function(result) {
				if (!args[1]) return args[1] = 'No reason specified';
				if (result.roles.highest.position > bot.roles.highest.position) { return message.reply('I cannot ban this member; the specified user\'s role is placed higher than mine.'); }
				result.ban({ reason: args[1] });
				message.reply('Successfully banned the user from the discord server.');
			}).catch(function() {
				return message.channel.send('Invalid format, could not find the user or user does not exist.');
			});
		}
		else {
			message.reply('You do not have permissions to ban this member!');
		}
	}).catch(function(error) {
		console.log(error);
	});
};