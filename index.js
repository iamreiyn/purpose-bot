const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const config = require('./config.json');
client.config = config;
const fs = require('node:fs');

client.commands = new Discord.Collection();

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

client.on('messageCreate', async msg => {
	if (msg.content === 'dickhead' || msg.content === 'nigger' || msg.content === 'bhenchod') return msg.channel.send(`*MDB 783 Guard slaps ${msg.author} for using bad words.*`);
	if (msg.content === 'Hello' || msg.content === 'Hey' || msg.content === 'Guys' || msg.content === 'Hi') return msg.channel.send(`Hey! ${msg.author}`);
	if (msg.content === 'How are you' || msg.content === 'Whatsup' || msg.content === 'Sup') return msg.reply('All good, what about you?');
});

client.login(config.token);