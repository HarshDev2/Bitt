const { EmbedBuilder, PermissionsBitField } = require('discord.js');

exports.run = (client, message, args) => {
    const amount = parseInt(args[0]);

    const AmountError = new EmbedBuilder()
    .setDescription('Enter an amount between 1 and 100.')

    const AmountDeleted = new EmbedBuilder()
    .setDescription(`Sucessfully deleted ${amount} messages.`)

    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

    if(amount > 100 || amount < 1) return message.channel.send({ embeds: [AmountError], ephemeral: true});
    
    message.channel.bulkDelete(amount);
    message.channel.send({ embeds: [AmountDeleted] });
}
exports.name = 'purge'