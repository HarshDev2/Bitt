const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge any amount of messages!')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of message to be cleared.')
                .setRequired(true)),

	async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: 'You do not have permission to use this command'});

         await interaction.channel.bulkDelete(amount);

         await interaction.reply(`Sucessfully Deleted ${amount} messages.`);
         setTimeout(() => interaction.deleteReply(), 3000);

	},
};
