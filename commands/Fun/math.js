exports.run = async (client, message, args) => {
	if (!args[0]) return message.reply('Invalid format, example: -math 230-80');
	const add = /\+/.test(message.content);
	// Simple fix for any conflict with prefix
	const sub = message.content.match(/-/g);
	const mul = /\*/.test(message.content);
	const div = /\//.test(message.content);
	if (add) {
		const numArray = args[0].split('+');
		const sum = parseInt(numArray[0]) + parseInt(numArray[1]);
		message.reply('The answer is ' + sum);
	}
	else if (sub[1]) {
		const numArray = args[0].split('-');
		const sum = numArray[0] - numArray[1];
		message.reply('The answer is ' + sum);
	}
	else if (mul) {
		const numArray = args[0].split('*');
		const sum = numArray[0] * numArray[1];
		message.reply('The answer is ' + sum);
	}
	else if (div) {
		const numArray = args[0].split('/');
		const sum = numArray[0] / numArray[1];
		message.reply('The answer is ' + sum);
	}
	else {
		message.reply('Invalid format, please use -math 230+60 as for example');
	}
};
