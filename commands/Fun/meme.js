const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message) => {
	try {
		const url = await fetch('https://www.reddit.com/r/memes/random/.json');
		const random = await url.json();

		const embed = new MessageEmbed()
			.setTitle(`Random Meme | ${random[0].data.children[0].data.title}`)
			.setImage(random[0].data.children[0].data.url)
			.setColor('BLUE')
			.setFooter('Purpose Bot v1.0.5, created by Renisal');

		await message.channel.send({ embeds: [embed] });
	}
	catch (err) {
		console.log(err);
	}
};