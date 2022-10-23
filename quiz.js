const dotenv = require('dotenv');
const { Client, Events, GatewayIntentBits, AuditLogOptionsType, EmbedBuilder} = require('discord.js');
const prefix = '!p';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token  = process.env.TOKEN;
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const QuizEmbed = new EmbedBuilder()
	.setColor(0x000000)

	.setDescription('Quiz is being built.')
	.setTimestamp()

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} quiz`)){
       message.channel.send({ embeds: [QuizEmbed]
    }
)
}
});