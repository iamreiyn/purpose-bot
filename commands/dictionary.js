const Discord = require('discord.js');
const axios = require('axios');

exports.run = (client, message, args) => {
	axios
		.get(
			`https://dictionaryapi.com/api/v3/references/learners/json/${args[0]}?key=6003cbae-501c-44d7-b11e-910ca25af23f`,
			{
				params: {
					key: process.env.DICTIONARY_KEY,
				},
			},
		)
		.then(function(response) {
			const data = response.data[0];

			// If the result is a list of strings, it's not a valid word.
			if (typeof data !== 'object') {
				const result = new Discord.MessageEmbed()
					.setTitle(
						'Invalid word: The word youve entered isnt in the dictionary.',
					)
					.setColor('RED');
				if (!response.data || response.data.length === 0) {result.setDescription('');}
				else {
					result.setDescription(
						'Maybe try one of these suggestions: \n' +
                message.channel.send('' + response.data),
					);
				}
				return message.channel.send('' + result);
			}

			const definitions = data.shortdef;
			const type = data.fl;
			let description = '';
			for (let i = 0; i < definitions.length; i++) {
				description += `[${i + 1}] ${definitions[i]}`;
				description += i == definitions.length - 1 ? '' : '\n';
			}

			const embed = new Discord.MessageEmbed()
				.setTitle(`Definition: ${args[0]} (${type})`)
				.setColor('RED')
				.setDescription(description)
				.setFooter('Purpose Bot v1.0.3, created by Renisal');
			message.channel.send({ embeds: [embed] });
		})
		.catch(function(error) {
			console.log(error);
			return message.channel.send(
				`Sorry, I can't define that at the moment <@${message.author.id}>!`,
			);
		});
};

exports.name = 'dict';