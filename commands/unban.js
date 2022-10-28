const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Kicks a particular user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to be ubnbanned.')
                .setRequired(true)),

	async execute(interaction, client) {
        const user = interaction.options.getUser('user');

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: 'You do not have permission to unban a member.', ephemeral: true});

        const unbannedUser = interaction.guild.members.unban(user);

        await user.send(`You have been unbanned from ${interaction.guild}.`);

        await interaction.reply({content: `You have sucessfully unbanned ${user} from ${interaction.guild.name}.`})
    }

}