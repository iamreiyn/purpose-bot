const { MessageEmbed } = require('discord.js');
const request = require('request');

exports.run = (client, message) => {
	request.get('http://thecatapi.com/api/images/get?format=src', {

	}, function(error, response) {
		if (!error && response.statusCode == 200) {
			const embed = new MessageEmbed()
				.setTitle('Here is a kitty!')
				.setColor('RED')
				.setImage(response.request.uri.href)
				.setAuthor(message.author.username);
			message.channel.send({ embeds: [embed] });
		}
		else {
			console.log(error);
		}
	});
};

exports.name = 'cat';