const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('a random inspirational quote for you'),

	async execute(interaction) {
        const json = await fetch("https://api.quotable.io/random");

        const response = await json.json();

        const quote = response.content;
        const quoteAuthor = response.author;

        const quoteEmbed = new EmbedBuilder()
        .setTitle(`Quote from ${quoteAuthor}.`)
           .setDescription(`${quote}`)
           .setColor(0x00AE86)
           .setTimestamp()

           await interaction.reply({ embeds: [quoteEmbed]});
        }
}