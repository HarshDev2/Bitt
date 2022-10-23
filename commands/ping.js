const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

exports.run = (client, message, args) => {

const PingEmbed = new EmbedBuilder()
	.setColor(0x000000)
	.setDescription('Pong!')
	.setTimestamp()
   
	message.channel.send({ embeds: [PingEmbed]});
}
exports.name = 'ping'