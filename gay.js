const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('gay')
		.setDescription('Tells how much gay you are'),

	async execute(interaction) {
        var gayrate = Math.floor(Math.random() * 100)
        const GayEmbed = new EmbedBuilder()
        .setColor("Yellow")
	    .setDescription(`you are ${gayrate}% gay!`)
   
         await interaction.reply({embeds: [GayEmbed]});

	},
};