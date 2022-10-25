const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

exports.run = (client, message, args) => {

const HelpEmbed = new EmbedBuilder()
	.setColor(0x000000)
	.setTitle('Bot Help!')
	.setDescription('My Prefix is !p \n \n **Bot Commands -** \n \n !p help - shows this help page. \n \n !p ping - replies with pong message \n \n !p quiz - starts a quiz. \n \n !p info - shows bot info')
	.setTimestamp()
   
	message.channel.send({ embeds: [HelpEmbed]});
}
exports.name = 'help'