const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
	if (!args[0]) {
		args[0] = message.author;
	}
	const userObj2 = await client.users.fetch(args[0]).catch(console.error);
	await message.guild.members.fetch(args[0])
		.then(u => {
			const embed = new MessageEmbed()
				.setAuthor({ name: u.user.username + '#' + u.user.discriminator, iconURL: u.displayAvatarURL({ size: 1024, dynamic: true }) })
				.setColor('BLUE')
				.addField('Joined', `${new Date(u.joinedTimestamp)}`, true)
				.addField('Account Created', `${userObj2.createdAt}`, false)
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
		})
		.catch(console.error);
};