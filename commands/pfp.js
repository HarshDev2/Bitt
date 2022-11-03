const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pfp')
		.setDescription('Get a user profile picture.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Person whose profile picture you want to get')),

	async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.member;
            const pfpEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('PFP')
            .setDescription('Here is the user\'s profile picture.')
            .setImage(user.displayAvatarURL())

            interaction.reply({embeds: [pfpEmbed]});
        }
	}