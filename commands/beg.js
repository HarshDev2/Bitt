const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { User } = require("../models/userSchema")
const prettyMilliseconds = require('pretty-ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("Beg stranger for money"),
     async execute(interaction) {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id })
        const amount = await Math.floor(Math.random() * 500)

        const begTimerEmbed = new EmbedBuilder()
        .setColor("Yellow")
        .setDescription(`⌛ Stop begging so much, wait for **\`${prettyMilliseconds(userData.cooldowns.beg - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)

        const begFailedEmbed = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription(`🥺 You got nothing this time, maybe try hard next time?`)

        const begPassedEmbed = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription(`Oh my! You begged and earned \ ${amount} :coin: `)

        if(!userData){
            const accountInvalidEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('Your do not have an bitt\'s currency account, please continue with `/start`.')

            return interaction.reply({embeds: [accountInvalidEmbed]})
        }
        else if (userData.cooldowns.beg > Date.now()) return interaction.reply({ embeds: [begTimerEmbed], ephemeral: true})


        else if(amount <= 5) {
            userData.cooldowns.beg = Date.now() + (1000 * 60)
            userData.save()
            return interaction.reply({embeds: [begFailedEmbed]})
        }
        else {
            userData.wallet += amount
            userData.cooldowns.beg = Date.now() + (1000 * 60)
            await userData.save()

            return interaction.reply({embeds: [begPassedEmbed]});
        }
    }
}