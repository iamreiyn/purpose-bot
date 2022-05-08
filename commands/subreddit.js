const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

exports.run = async (client, message, args) => {
	if (!args[0] && !args[0] === 'set' && !args[1]) return message.channel.send('Invalid format, please use -subreddit set <subreddit name>');
	let lastTimestamp = new Date() / 1000;
	let latestPosts = [];
	setInterval(() => {
		console.log('Data Collected!');
		axios.get(`https://www.reddit.com/r/${args[1]}/new.json?limit=1`)
			.then(res => {
				latestPosts = [];
				for (const post of res.data.data.children.reverse()) {
					if (new Date(post.data.created_utc * 1000) > lastTimestamp) {
						latestPosts.push({ name: post.data.title, url: post.data.permalink });
						lastTimestamp = new Date(post.data.created_utc * 1000);

						const embed = new MessageEmbed()
							.setAuthor('u/' + post.data.author)
							.setTitle(post.data.title)
							.setDescription(post.data.selftext)
							.addFields(
								{ name: 'Post URL', value: 'https://www.reddit.com' + post.data.permalink },
							)
							.setColor('BLUE')
							.setFooter('Purpose Bot - www.github.com/renisal');

						message.channel.send({ embeds: [embed] });
					}
				}
			});
	}, 5000);
};

exports.name = 'reddit';