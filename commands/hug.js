const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const Random  = require("something-random-on-discord").Random;

module.exports = {
	data: new SlashCommandBuilder()
	.setName('hug')
        .setDescription('punch someone.')
        .addUserOption((option) => option.setName('user')
        .setDescription('user to be punched..')
        .setRequired(true)),

	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const hugGifs = ['https://media.tenor.com/G_IvONY8EFgAAAAS/aharen-san-anime-hug.gif', 'https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif', 'https://media.tenor.com/4Bez5mC86CkAAAAC/hug.gif']
        const random = Math.floor(Math.random() * 1);
        const data = hugGifs[random];
    
        const hugEmbed = new EmbedBuilder()
        .setImage(data)
        .setColor("Random")
        .setDescription(`<@${interaction.member.id}> hugs <@${user.id}>`)
        .setTimestamp()
        
        interaction.reply({ embeds: [hugEmbed] });
	}
};
