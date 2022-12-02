const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cry')
		.setDescription('show others you are crying..'),

	async execute(interaction) {
        const cryGifs = ['https://media.tenor.com/A0g9Rrx4aNsAAAAS/sad-angry.gif', 'https://media.tenor.com/_eEcwl8Mn50AAAAM/akebi-chan-no-sailor-anime-cry.gif', 'https://media.tenor.com/XBWh-szFwDQAAAAC/crying-naruto-crying.gif']
        const random = Math.floor(Math.random() * 2);
        const data = cryGifs[random];
    
        const cryEmbed = new EmbedBuilder()
        .setImage(data)
        .setColor('Fuchsia')
        .setDescription(`Please talk with <@${interaction.member.id}> they are crying`)
        .setTimestamp()
        
        interaction.reply({ embeds: [cryEmbed] });
	}
};
