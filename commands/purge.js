const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge any amount of messages!')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of message to be cleared.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

	async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

         await interaction.channel.bulkDelete(amount);

         await interaction.reply(`Sucessfully Deleted ${amount} messages.`);

	},
};
