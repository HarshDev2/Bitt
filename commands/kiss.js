const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('kiss someone..')
        .addUserOption((option) => option.setName('user')
        .setDescription('who you want to kiss??')
        .setRequired(true)),

	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const kissGifs = ['https://media.tenor.com/06lz817csVgAAAAS/anime-anime-kiss.gif', 'https://media.tenor.com/dn_KuOESmUYAAAAM/engage-kiss-anime-kiss.gif', 'https://media.tenor.com/Ogthkl9rYBMAAAAC/ichigo-hiro.gif']
        const random = Math.floor(Math.random() * 2);
        const data = kissGifs[random];
    
        const kissEmbed = new EmbedBuilder()
        .setImage(data)
        .setColor('Fuchsia')
        .setDescription(`<@${interaction.member.id}> kisses <@${user.id}> awww!`)
        .setTimestamp()
        
        interaction.reply({ embeds: [kissEmbed] });
	}
};
