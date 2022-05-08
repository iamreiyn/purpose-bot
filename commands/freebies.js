const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

exports.run = async (client, message, args) => {
	// Incomplete work
	if (!args[0]) return message.channel.send('Invalid format, please use -freebies set <#channel>');
	let lastTimestamp = new Date() / 1000;
	let latestPosts = [];
	const epicpng = 'https://i.postimg.cc/XJHttC4C/rensepicpng.png';
	setInterval(() => {
		console.log('Data Collected!');
		axios.get('https://www.reddit.com/r/FreeGameFindings/new.json?limit=1')
			.then(res => {
				latestPosts = [];
				for (const post of res.data.data.children.reverse()) {
					if (new Date(post.data.created_utc * 1000) > lastTimestamp) {
						latestPosts.push({ name: post.data.title, url: post.data.permalink });
						lastTimestamp = new Date(post.data.created_utc * 1000);

						const Epic = post.data.title.match(/Epic Games/);

						if (Epic) {
							const newTitle = post.data.title.replace('[Epic Games]', ' ');
							const embed = new MessageEmbed()
								.setAuthor('Epic Games', epicpng)
								.setTitle(newTitle)
								.setImage(post.data.thumbnail)
								.setDescription(post.data.url_overridden_by_dest)
								.setColor('BLUE')
								.setFooter('Purpose Bot v1.0.5, created by Renisal');

							message.channel.send({ embeds: [embed] });
						}
					}
				}
			});
	}, 3000);
};