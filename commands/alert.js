const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alert')
		.setDescription('check the latest new by devs..'),

	async execute(interaction) {
                
        const AlertEmbed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle('Alert from the developers!')
        .setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')
        .setDescription(`**Bitt Updated** \n **New Update Details -** \n \n **Economy System added** \n Bitt now have it's own economy system use \`/start\` and have some fun.. \n \n **Fun Action Commands Added** \n We have added action commands like \`/hug\`, \`/kiss\`, \`/punch\`, \`/kill\`, etc.. \n \n **Commands Errors Fixed!** \n We have fixed errors in commands like \`/gay\` and \`/meme\`. \n \n for more information join this discord server.. \n https://discord.gg/yypduxnAGm`)
        .setTimestamp()
        
        interaction.reply({ embeds: [AlertEmbed] });
	}
};
