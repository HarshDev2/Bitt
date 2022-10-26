const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('shows all the commands bot have'),

	async execute(interaction) {
        const HelpEmbed = new EmbedBuilder()
        .setColor(0x000000)
	    .setTitle('Bot Help!')
	    .setDescription('My Prefix is !p \n \n **Bot Commands -** \n \n !p help - shows this help page. \n \n !p purge - clears any amount of messages you want. \n \n !p ping - replies with pong message \n \n !p quiz - starts a quiz. \n \n !p info - shows bot info')
	    .setThumbnail('https://styles.redditmedia.com/t5_3b1wr/styles/communityIcon_qdbg6bz0bud71.png?width=256&s=ccf3d06bf3b8056f312f207c7ce906cf69af6efd')
	    .setTimestamp()
   
         await interaction.reply({embeds: [HelpEmbed]});

	},
};
