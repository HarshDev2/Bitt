const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

exports.run = (client, message, args) => {

const QuizEmbed = new EmbedBuilder()
	.setColor(0x000000)
	.setDescription('Quiz is being built.')
	.setTimestamp()
   
	message.channel.send({ embeds: [QuizEmbed]});
}
exports.name = 'quiz'