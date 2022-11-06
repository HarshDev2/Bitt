const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('make the bot say anything!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('message that bot will say!')
                .setRequired(true)),

	async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        const message = interaction.options.getString('message');
        const messageEmbed = new EmbedBuilder()
	    .setDescription(message)

        await interaction.channel.send({embeds: [messageEmbed]});
        await interaction.editReply({content: 'Message Sent!'});

	},
};
