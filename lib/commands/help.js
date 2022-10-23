const { Client, Events, GatewayIntentBits, AuditLogOptionsType, EmbedBuilder} = require('discord.js');
const prefix = '!p';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const HelpEmbed = new EmbedBuilder()
	.setColor(0x000000)
	.setTitle('Bot Help!')

	.setDescription('My Prefix is !p \n \n **Bot Commands -** \n \n !p help - shows this help page. \n \n !p ping - replies with pong message \n \n !p quiz - starts a quiz.')
	.setTimestamp()

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} help`)){
            message.channel.send({ embeds: [HelpEmbed]});
    }
});