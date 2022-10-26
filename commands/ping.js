const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('replies with pong!'),

	async execute(interaction) {
        const PingEmbed = new EmbedBuilder()
	    .setDescription('**Pong!**')
   
         await interaction.reply({embeds: [PingEmbed]});

	},
};
