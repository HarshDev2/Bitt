const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('gay')
		.setDescription('Tells how much gay you are'),

	async execute(interaction) {
        var gayrate = Math.floor(Math.random() * 100)
        const GayEmbed = new EmbedBuilder()
		.setTitle('GayRate')
        .setColor("Yellow")
	    .setDescription(`you are ${gayrate}% gay!`)
		.setTimestamp()
   
         await interaction.reply({embeds: [GayEmbed]});

	},
};