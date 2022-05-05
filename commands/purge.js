exports.run = async (client, message, args) => {
	const amount = parseInt(args[0]);

	if (!amount) return message.channel.send('Please specify the amount of messages you want me to delete');
	if (amount > 100 || amount < 1) return message.channel.send('Please select a number *between* 100 and 1');

	message.channel.bulkDelete(amount).catch(() => message.channel.send('Due to Discord Limitations, I cannot delete messages older than 14 days'));

	const messages = await message.channel.send(`Deleted \`${amount}\` messages`);
	setTimeout(() => {
		messages.delete();
	}, 2000);
};

exports.name = 'purge';