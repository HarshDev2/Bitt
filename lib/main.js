const dotenv = require('dotenv');
const { Client, Events, GatewayIntentBits, AuditLogOptionsType, EmbedBuilder} = require('discord.js');
const prefix = '!p';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

dotenv.config();
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
const token  = process.env.TOKEN;
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const HelpEmbed = new EmbedBuilder()
	.setColor(0x000000)
	.setTitle('Bot Help!')

	.setDescription('My Prefix is !p \n \n **Bot Commands -** \n \n !p help - shows this help page. \n \n !p ping - replies with pong message \n \n !p quiz - starts a quiz.')
	.setTimestamp()

const PingEmbed = new EmbedBuilder()
	.setColor(0x000000)

	.setDescription('Pong!')
	.setTimestamp()

const QuizEmbed = new EmbedBuilder()
	.setColor(0x000000)

	.setDescription('Quiz is being built.')
	.setTimestamp()

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
});

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} ping`)){
        message.channel.send({embeds: [PingEmbed]});
    }
});
client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} help`)){
        message.channel.send({ embeds: [HelpEmbed]});
    }
});

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} quiz`)){
       message.channel.send({ embeds: [QuizEmbed]
    }
)
}
});

// Log in to Discord with your client's token
client.login(token);