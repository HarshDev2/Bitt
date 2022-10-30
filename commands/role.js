const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('manage roles in the server.')
		.addSubcommand(
			(subcommand) => subcommand.setName('create')
			.setDescription('Creates a role.')

			.addStringOption((option) => option.setName('name')
			.setDescription('Role name to create.')
			.setRequired(true))

			.addStringOption((option)=> option.setName('color')
			.setDescription('Role color to create.')
            .setRequired(true))
			
		)
		.addSubcommand((subcommand) => subcommand.setName('delete')
		.setDescription('Deletes a role.')

		.addRoleOption((option) => option.setName('role')
		.setDescription('Role to delete.')
        .setRequired(true))
		),

	async execute(interaction) {
		const createRole = interaction.options.getSubcommand() == 'create';
		const deleteRole = interaction.options.getSubcommand() == 'delete';

		if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({ content: 'You don\'t have permission to manage roles'});

		if(createRole){
			const role = interaction.options.getString('name')
			const color = interaction.options.getString('color')

			interaction.member.guild.roles.create({
                name: role,
            })
			await interaction.reply({content: 'Role created', ephemeral: true})
		}
		if(deleteRole){
			const role = interaction.options.getRole('role');
			interaction.member.guild.roles.delete(role)

			await interaction.reply({content: 'Role deleted', ephemeral: true})
		}
	},
};
