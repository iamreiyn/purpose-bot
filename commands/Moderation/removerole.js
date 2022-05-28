const { Permissions } = require('discord.js');

exports.run = async (client, message, args) => {
	if (args[2]) {
		args[1] = args[1] + ' ' + args[2];
	}
	if (message.member.permissions.has([Permissions.FLAGS.MANAGE_ROLES])) {
		if (!args[0]) return message.reply('Please mention or define a user ID to remove the role');
		message.mentions.members.first() || message.guild.members.fetch(args[0]).then(function(result) {
			if (!args[1]) return message.reply('Please define a role to remove!');
			const role = message.member.guild.roles.cache.find(r => r.name === args[1]);

			if (role) {
				if (!role.editable) return message.reply('I do not have the permissions to remove this role!');
				if (!result.roles.cache.some(r => r.name === role.name)) return message.reply('Cannot remove the role, the specified user does not have this role');
				result.roles.remove(role);
				message.reply(`Sucessfully removed the role "${role.name}" from ${result.displayName}.`);
			}
			else {
				message.reply('I could not find the specified role in this server.');
			}
		}).catch(function(error) {
			console.log(error);
			return message.channel.send('Invalid format, could not find the user or user does not exist.');
		});
	}
	else {
		message.reply('You do not have permissions to remove this role!');
	}
};