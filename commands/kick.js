const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a particular user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to be kicked.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for user to be kicked')
                .setRequired(true)),

	async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason')

        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {});

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({content: 'You do not have permission to kick a member.', ephemeral: true});
        if(!reason) return interaction.reply({content: 'Provide a reason', ephemeral: true})

        if(!member) return interaction.reply({content: 'Can\'t find this user', ephemeral: true})

        if(!member.kickable) return interaction.reply({content: 'Unable to kick this user.', ephemeral: true});

        if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({content: 'This member has higher or equal rank than you', ephemeral: true});

        member.kick({ reason });

        await member.user.send(`You have been kicked from ${interaction.guild.name} for reason - \`${reason}\`.`);

        await interaction.reply({content: `You have sucessfully kicked ${member} from ${interaction.guild.name}.`})

	},
};
