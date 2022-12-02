const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('kill')
        .setDescription('kill someone.')
        .addUserOption((option) => option.setName('user')
        .setDescription('user to be killed..')
        .setRequired(true)),

	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const killGifs = ['https://media.tenor.com/1dtHuFICZF4AAAAC/kill-smack.gif', 'https://media.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif']
        const random = Math.floor(Math.random() * 1);
        const data = killGifs[random];
    
        const killEmbed = new EmbedBuilder()
        .setImage(data)
        .setColor("Random")
        .setDescription(`<@${interaction.member.id}> killed <@${user.id}>`)
        .setTimestamp()
        
        interaction.reply({ embeds: [killEmbed] });
	}
};
