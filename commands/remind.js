exports.run = (client, message, args) => {
	if (!args[0]) return message.reply('Invalid format, please define a number');
	const timeout = args[0] * 1000;
	let reason = 'No reason specified';
	if (args[1]) {
		reason = args[1];
	}
	message.reply('Reminder started, you will be notified after **' + args[0] + '** seconds (REASON: ' + reason + ')');
	setTimeout(function() {
		message.reply('Reminder executed after **' + args[0] + '** seconds (REASON: ' + reason + ')');
	}, parseInt(timeout));
};

exports.name = 'remind';