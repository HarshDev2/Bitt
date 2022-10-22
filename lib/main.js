const dotenv = require('dotenv');

dotenv.config();

const { Client, Events, GatewayIntentBits, AuditLogOptionsType } = require('discord.js');
const token  = process.env.TOKEN;
const prefix = '!p';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix}ping`)){
        message.channel.send('pong!');
    }
});
client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix} help`)){
        message.channel.send('My prefix is !p');
    }
});
// Log in to Discord with your client's token
client.login(token);