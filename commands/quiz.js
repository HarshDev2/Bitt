const { EmbedBuilder } = require('discord.js');

exports.run = (client, message, args) => {

const CategoryChooser = new EmbedBuilder()
		.setDescription('Please choose an category - \n \n (a) - History \n (b) - Arts \n (c) - Computer \n (d) - Comics \n (e) - Animals')
	
		message.channel.send({embeds: [CategoryChooser] }).then(sentMessage => {
			sentMessage.react('🇦');
			sentMessage.react('🇧');
			sentMessage.react('🇨');
			sentMessage.react('🇩');
			sentMessage.react('🇪');
		  });

		  

	const filter = (reaction, user) => {
		return ['🇦', '🇧', '🇨', '🇩', '🇪'].includes(reaction.emoji.name);
	};

	message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();

			if (reaction.emoji.name == '🇦') return message.channel.send('you choosed a')
		})
		.catch(collected => {
			message.reply('You didn\'t choosed anything.');
		});

const DifficultyChooser = new EmbedBuilder()
		.setDescription('Please choose an Difficulty - \n \n (a) - Easy \n (b) - Medium \n (c) - Hard')
	
		message.channel.send({embeds: [DifficultyChooser] }).then(sentMessage => {
			sentMessage.react('🇦');
			sentMessage.react('🇧');
			sentMessage.react('🇨');
		  });


		}
exports.name = 'quiz'