const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {
	const owner = client.users.cache.find(user => user.id === message.guild.ownerId);
	const embed = new MessageEmbed()
		.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
		.setColor('BLUE')
		.setDescription(`Owner: ${owner.tag} (${owner.id})`)
		.addField('Member Count', `${message.guild.memberCount}`)
		.addField('Created', `${message.guild.createdAt.toLocaleString()}`, true)
		.setTimestamp()
		.setFooter({ text: client.user.username, iconURL: client.user.avatarURL });
	message.channel.send({ embeds: [embed] });
};