exports.run = async (client, message, args) => {
	if (args[2]) {
		args[1] = args[1] + ' ' + args[2];
	}
	const taggedUser = message.mentions.members.first();
	if (!taggedUser) return message.reply('Please mention someone to assign the role!');
	// eslint-disable-next-line no-shadow
	const role = message.member.guild.roles.cache.find(role => role.name === args[1]);
	if (!role) return message.reply('Please define a role!');
	await taggedUser.roles.add(role).catch((e) => console.log(e));
	message.channel.send(`Sucessfully assigned the role "${role.name}" to ${taggedUser.displayName}.`);
};

exports.name = 'arole';