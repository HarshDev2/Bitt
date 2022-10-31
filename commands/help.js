const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('helpt')
		.setDescription('shows all the commands bot have'),

	async execute(interaction) {

        const HelpEmbed = new EmbedBuilder()
        .setColor(0x000000)
	    .setTitle('Bot Help!')
	    .setDescription('I use slash commands. \n \n **Bot Commands -** \n \n **Utility Commands ** \n \n ** /help ** \nshows this help page. \n \n ** /info ** \n  shows bot info. \n \n ** /announce ** \n announces a messge in embed or without embed in a specified channel. \n \n ** /purge ** \nclears any amount of messages you want.\n \n ** /role create ** \n Adds a role to the server. \n \n **/role delete ** \n Deletes a role from the server. \n \n ** /ban ** \n bans a user from the server. \n \n ** /unban ** \n unbans a user from the server. \n \n ** /nickname change ** \n changes the nickname of a user. \n \n ** Fun Commands ** \n \n ** /pfp ** \n shows a user profile picture. \n \n ** /ping ** \n replies with pong message. \n \n ** /gay ** \n shows gayrate of a user. \n \n ** /echo ** \n make the bot say whatever you want.')
		.setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')
	    .setTimestamp()
   
         await interaction.reply({embeds: [HelpEmbed]});

	},
};
