const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usert')
		.setDescription('Provides information about a user.')
		.addUserOption(option =>
            option.setName('user')
			.setDescription('The user to get information about.')),

	async execute(interaction) {
		const user = interaction.options.getMember('user') || interaction.member;
		const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		
		const userDetailsEmbed = new EmbedBuilder()
		.setColor('Yellow')
		.setTitle(`${user.user.tag} | User Details`)
		.setThumbnail(user.displayAvatarURL())
		.setDescription(`**User tag** \n${user.user.tag} \n \n **User ID** \n${user.user.id} \n \n **User Roles ** \n ${user.roles.cache.map(r => r).join(' | ')} \n \n **Joined Discord** \n${user.user.createdAt.getDate()} ${month[user.user.createdAt.getMonth() + 1]} ${user.user.createdAt.getFullYear()} \n \n **Joined Server** \n${user.joinedAt.getDate()} ${month[user.joinedAt.getMonth() + 1]} ${user.joinedAt.getFullYear()}`)

		await interaction.reply({embeds: [userDetailsEmbed]});
	},
};