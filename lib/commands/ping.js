const { Client, Events, GatewayIntentBits, AuditLogOptionsType, EmbedBuilder} = require('discord.js');
const prefix = '!p';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const PingEmbed = new EmbedBuilder()
	.setColor(0x000000)

	.setDescription('Pong!')
	.setTimestamp()

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} ping`)){
        message.channel.send({embeds: [PingEmbed]});
    }
});