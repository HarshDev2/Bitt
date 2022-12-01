const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { User } = require("../models/userSchema")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("start your bitties journey!"),
     async execute(interaction) {
        const user = interaction.member.user;
        const userData = await User.findOne({ id: user.id });

        if(userData){
            const startEmbed = new EmbedBuilder()
            .setTitle('Action Failed!')
            .setColor('Red')
            .setDescription('You already have an bitt currency\'s account..')

            return interaction.reply({embeds: [startEmbed]})
        }
        if(!userData){
            const startEmbed = new EmbedBuilder()
            .setTitle('Account Created!')
            .setColor('Green')
            .setDescription('Your journey has been started..')

            await User.create({id: user.id, AlertSeen: true});

            return interaction.reply({embeds: [startEmbed]})
        }
    }
}