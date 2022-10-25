const { EmbedBuilder, PermissionsBitField } = require('discord.js');

exports.run = (client, message, args) => {
    const amount = parseInt(args[0]);

    if(amount > 100 || amount < 1) return message.channel.send('Enter an amount between 1 and 100.');
    else { 
        message.channel.bulkDelete(amount);
        message.channel.send(`Sucessfully deleted ${amount} messages.`);
    }
}
exports.name = 'purge'