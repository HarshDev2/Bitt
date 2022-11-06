const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Gives you a random number'),

	async execute(interaction) {
        const randomNumber = Math.floor(Math.random() * 100);
        const randomEmbed = new EmbedBuilder()
		.setTitle('Random Number')
        .setColor("Aqua")
        .setDescription(`Your random number is ${randomNumber}.`)
		.setTimestamp()
   
        await interaction.reply({embeds: [randomEmbed]});

	},
};