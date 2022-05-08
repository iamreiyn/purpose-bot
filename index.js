const { Client, Collection } = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const config = require('./config.json');
client.config = config;
const fs = require('node:fs');

client.commands = new Collection();

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
	const eventName = file.split('.')[0];
	const event = require(`./events/${file}`);
	client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commands) {
	const commandName = file.split('.')[0];
	const command = require(`./commands/${file}`);
	client.commands.set(commandName, command);
}

client.once('ready', () => {
	console.log('STARTED: Purpose is now Online');
	client.user.setActivity('with -help | purpose.gg', { type: 'PLAYING' });
});

const badWords = ["idiot", "retard"];

client.on('messageCreate', async msg => {
	// INCOMPLETE WORK
	badWords.forEach(word => {
		if (msg.content.includes(word)) {
			return msg.reply('Please avoid using offensive language in this discord server!');
		}
	});	

	if (msg.content === 'Hello' || msg.content === 'Hey' || msg.content === 'Guys' || msg.content === 'Hi') return msg.channel.send(`Hey! ${msg.author}`);
	if (msg.content === 'How are you' || msg.content === 'Whatsup' || msg.content === 'Sup') {
		const contents = ['All good, what about you?', 'I\'m good, and you?', 'Fine', 'Not bad, another day of moderating the server', 'Good, wbu?'];
		const random = Math.floor(Math.random() * contents.length);
		msg.reply(contents[random]);
	}
	if (msg.content.match(/doing/) || msg.content.match(/good/)) {
		msg.reply('That is nice to hear!');
	}
});

client.login(config.token);