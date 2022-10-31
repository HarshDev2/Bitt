const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('shows all the info about the bot.'),

	async execute(interaction) {
        const InfoEmbed = new EmbedBuilder()
	    .setColor(0x000000)
        .setAuthor({ name: 'Bitt' })
	    .setDescription('Hi, my name is Bitt i am a multi purpose discord bot being developed by example team of developers.')
        .setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')  
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
