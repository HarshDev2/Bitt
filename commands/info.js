const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('shows all the info about the bot.'),

	async execute(interaction) {
        const InfoEmbed = new EmbedBuilder()
	    .setColor(0x000000)
        .setAuthor({ name: 'ProgQuiz' })
	    .setDescription('Hi, my name is progquiz i am a discord bot developed by example team of developers, you can have fun with with my commands and get started by typing !p quiz.')
        .setThumbnail('https://styles.redditmedia.com/t5_3b1wr/styles/communityIcon_qdbg6bz0bud71.png?width=256&s=ccf3d06bf3b8056f312f207c7ce906cf69af6efd')
        .addFields(
		{
            name: 'Bot Information -',
            value: `I am in development stage. \n \n you can use \`/help\` to know more about my commands. \n`,
            inline: true
        },
        )
	    .setTimestamp()
   
        await interaction.reply({embeds: [InfoEmbed]});

	},
};
