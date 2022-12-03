const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('gay')
		.setDescription('Tells how much gay you are')
		.addUserOption((option) => option.setName('user')
		.setDescription('know the gayrate of another user..')),

	async execute(interaction) {
		const user = interaction.options.getUser('user') || interaction.member.user;

        var gayrate = Math.floor(Math.random() * 100)
        const GayEmbed = new EmbedBuilder()
		.setTitle('GayRate')
        .setColor("Yellow")
	    .setDescription(`${user.username} is ${gayrate}% gay!`)
		.setTimestamp()
   
         await interaction.reply({embeds: [GayEmbed]});

	},
};