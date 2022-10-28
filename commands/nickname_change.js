const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nickname_change')
		.setDescription('Change nickname of a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to be changed Nickname.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Nickname to be changed with.')
                .setRequired(true)),

	async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const nickName =  interaction.options.getString('name');

        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {});
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ChangeNickname)) return interaction.reply({content: 'You do not have permission to change a member\'s Nickname.', ephemeral: true});
        if(!member) return interaction.reply({content: 'Can\'t find this user', ephemeral: true})

        if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({content: 'This member has higher or equal rank than you', ephemeral: true});

        await member.setNickname(nickName);

        await interaction.reply({content: `You have sucessfully changed ${member}'s Nickname to ${nickName}.`})

	},
};
