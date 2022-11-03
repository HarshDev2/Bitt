const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('membercount')
		.setDescription('Get the member count of a server'),

	async execute(interaction) {
        const memberCount = interaction.guild.memberCount;

        const memberCountEmbed = new EmbedBuilder()
           .setTitle('Member Count')
           .setColor(0x00AE86)
           .setDescription(`This server have ${memberCount} members.`)
           .setTimestamp(new Date())

        interaction.reply({embeds: [memberCountEmbed]})
    }
}