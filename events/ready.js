const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: `with ${client.guilds.cache.size} servers and ${client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)} members.` }], status: 'online' });
	},
};