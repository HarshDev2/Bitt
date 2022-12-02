const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, Options } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('gets a random meme'),

    async execute(interaction) {
        const data = await fetch('https://meme-api.com/gimme')

        const response = await data.json();
        
        const memeTitle = response.title;
        const memeUrl = response.url;
        const memeImage = response.preview[2];

        const memeEmbed = new EmbedBuilder()
            .setTitle(`${memeTitle}`)
            .setURL(`${memeUrl}`)
            .setColor('Random')
            .setImage(memeImage)
            .setTimestamp()

        interaction.reply({ embeds: [memeEmbed] });
    }
}
