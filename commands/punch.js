const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const Random  = require("something-random-on-discord").Random;

module.exports = {
	data: new SlashCommandBuilder()
	.setName('punch')
        .setDescription('punch someone.')
        .addUserOption((option) => option.setName('user')
        .setDescription('user to be punched..')
        .setRequired(true)),

	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const punchGifs = ['https://media.tenor.com/FKP8EFeGFzEAAAAS/no-chiochannotsuugakuro.gif', 'https://media.tenor.com/6a42QlkVsCEAAAAS/anime-punch.gif']
        const random = Math.floor(Math.random() * 1);
        const data = punchGifs[random];
    
        const punchEmbed = new EmbedBuilder()
        .setImage(data)
        .setColor("Random")
        .setDescription(`<@${interaction.member.id}> punches <@${user.id}>`)
        .setTimestamp()
        
        interaction.reply({ embeds: [punchEmbed] });
	}
};
