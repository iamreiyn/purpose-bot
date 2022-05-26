const { MessageEmbed } = require('discord.js');
exports.run = async (client, message) => {

	const embed = new MessageEmbed()
		.setTitle('Purpose\'s commands')
		.setColor('RED')
		.setDescription('**MODERATION**')
		.addField('-help', 'Brings Up This Message.')
		.addField('-arole <mention> <rolename>', 'Assigns the role to the mentioned user')
		.addField('-mems', 'Shows the number of members in the server')
		.addField('-ping', 'Shows the latency and API latency as well')
		.addField('-purge <amount>', 'Mass deletes the messages defined as the amount')
		.addField('-regdate <mention>', 'Shows the discord registered date of the mentioned user')

		.addField('-avatar <mention>', 'Shows the full image avatar of the mentioned user')
		.addField('-cat', 'Some random cute cat images from the internet')
		.addField('-count <amount>', 'The bot counts the amount from 0 for you')
		.addField('-math <operator>', 'Performs the mathematical operation, e.g. -math 2323+9120')
		.addField('-remind <seconds> <opt:reason>*', 'Reminds you after X seconds for the X reason')
		.addField('-wotd', 'Word of the day, to learn some new English words daily')
		.addField('-dict <word>', 'An open dictionary that you can use within discord');
	message.channel.send({ embeds: [embed] });
};

exports.name = 'help';