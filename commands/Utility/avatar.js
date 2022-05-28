const Discord = require('discord.js');

exports.run = async (client, message) => {
	const member = message.mentions.users.first();
	if (!member) return message.reply('Incorrect format! please mention a user as well');
	const avatar = member.displayAvatarURL({ size: 1024, dynamic: true });

	const embed = new Discord.MessageEmbed()
		.setTitle(`${member.username}'s Avatar`)
		.setImage(avatar)
		.setColor('BLACK')
		.setAuthor({ name: member.username });
	message.channel.send({ embeds: [embed] });
};