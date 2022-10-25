const { EmbedBuilder, PermissionsBitField } = require('discord.js');

exports.run = (client, message, args) => {
    const amount = parseInt(args[0]);

    const AmountError = new EmbedBuilder()
    .setDescription('Enter an amount between 1 and 100.')

    const AmountDeleted = new EmbedBuilder()
    .setDescription(`Sucessfully deleted ${amount} messages.`)

    if(amount > 100 || amount < 1) {
        message.channel.send({ embeds: [AmountError], ephemeral: true})
    }
    
    else { 
        message.channel.bulkDelete(amount);
        message.channel.send({ embeds: [AmountDeleted] });
    }
}
exports.name = 'purge'