const { Client, Collection } = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const { readdirSync } = require('fs');
require('dotenv').config();
const { ChalkAdvanced } = require('chalk-advanced');

client.commands = new Collection();

const events = readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of events) {
	const eventName = file.split('.')[0];
	const event = require(`./events/${file}`);
	client.on(eventName, event.bind(null, client));
}

const commandFolders = readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const commandName = file.split('.')[0];
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(commandName, command);
	}
}


client.once('ready', () => {
	console.log(
		`${ChalkAdvanced.white('Started')} ${ChalkAdvanced.gray(
			'>',
		)} ${ChalkAdvanced.green('Purpose is now Online')}`,
	);
	client.user.setActivity(`with ${process.env.PREFIX}help | renisal.tech`, {
		type: 'PLAYING',
	});
});

client.on("InteractionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

const badWords = ['idiot', 'stupid'];
client.on('messageCreate', async (msg) => {
	// INCOMPLETE WORK
	badWords.forEach((word) => {
		if (msg.content.includes(word)) {
			return msg.reply(
				'Please avoid using offensive language in our discord server!',
			);
		}
	});
});

client.login(process.env.token);
