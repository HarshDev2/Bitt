const dotenv = require('dotenv');
const { Client, Events, GatewayIntentBits, AuditLogOptionsType, EmbedBuilder, Collection} = require('discord.js');
const fs = require('fs');
const prefix = '!p';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

dotenv.config();
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
const token  = process.env.TOKEN;

client.commands = new Collection();
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(file of commands){
	const commandName = file.split('.')[0]
	const command = require(`./commands/${commandName}`)
	client.commands.set(commandName, command)
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	});

client.on('messageCreate', (message) => {
    if(message.content.startsWith(prefix)){
       const args = message.content.slice(prefix.length).trim().split(/ +/g);
	   const commandName = args.shift();
	   const command = client.commands.get(commandName);
	   if(!command){
		message.channel.send('This command doesn\'t exists');
	   }
	   else return command.run(client, message, args);
	}
});

// Log in to Discord with your client's token
client.login(token);