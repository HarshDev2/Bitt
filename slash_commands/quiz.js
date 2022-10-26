const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Starts a Quiz!'),
	async execute(interaction) {
		await interaction.reply('Quiz is being built.');
	},
};
