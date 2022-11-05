const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('partners')
		.setDescription('shows the bot\'s partners.'),
	async execute(interaction) {
        const partnersEmbed = new EmbedBuilder()
            .setTitle('Bot\'s Partners')
            .setColor('Random')
            .setDescription('We don\'t have any partners yet.')
	},
};
