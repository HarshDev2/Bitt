const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pfp')
		.setDescription('Get a user profile picture.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Person whose profile picture you want to get')),

	async execute(interaction, client) {
        const user = interaction.options.getUser('user');

        if(!user){
            const pfpEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('PFP')
            .setDescription('Here is the user\'s profile picture.')
            .setImage(interaction.member.displayAvatarURL())

             interaction.reply({embeds: [pfpEmbed]});
        }
        if(user) {
            const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {});
            if(!member) return interaction.reply({content: 'Can\'t find this user', ephemeral: true})

            const pfpEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('PFP')
            .setDescription('Here is the user\'s profile picture.')
            .setImage(member.displayAvatarURL())

             interaction.reply({embeds: [pfpEmbed]});
        }
	},
};
