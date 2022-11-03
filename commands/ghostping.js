const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ghostping')
		.setDescription('announce anything in any channel!')

        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role to ghostping')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to ghostping')
                .setRequired(true)),

	async execute(interaction) {
        await interaction.deferReply({ephemeral: true});

        const channel = interaction.options.getChannel("channel");
        const role = interaction.options.getRole("role");

        const permissions = channel.permissionsFor(interaction.member);

        if (!permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.editReply({content: 'You do not have permission to send message in that channel.'});

        channel.send(`${role}`).then(ping =>
            ping.delete())

        interaction.editReply({content: 'Ping has been sucessfully sent'});

	}
};
