const { Permissions } = require('discord.js');

exports.run = async (client, message, args) => {
	if (args[2]) {
		args[1] = args[1] + ' ' + args[2];
	}
	if (message.member.permissions.has([Permissions.FLAGS.MANAGE_ROLES])) {
		if (!args[0]) return message.reply('Please mention or define a user ID to assign the roles');
		message.mentions.members.first() || message.guild.members.fetch(args[0]).then(function(result) {
			if (!args[1]) return message.reply('Please define a role to assign!');
			const role = message.member.guild.roles.cache.find(r => r.name === args[1]);

			if (role) {
				if (!role.editable) return message.reply('I do not have the permissions to assign this role!');
				if (result.roles.cache.some(r => r.name === role.name)) return message.reply('Cannot assign the role, the specified user already has this role');
				result.roles.add(role);
				message.reply(`Sucessfully assigned the role "${role.name}" to ${result.displayName}.`);
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
		message.reply('You do not have permissions to assign this role!');
	}
};