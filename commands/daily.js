const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { User } = require("../models/userSchema")
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get your daily money"),
     async execute(interaction){
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id })
        if(!userData){
            const accountInvalidEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('Your do not have an bitt\'s currency account, please continue with `/start`.')

            return interaction.reply({embeds: [accountInvalidEmbed]})
        }
        else if (userData.cooldowns.daily > Date.now()){
            const dailyEmbed = new EmbedBuilder()
            .setDescription(`⌛ You have already collected your money, wait for **\`${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)

            interaction.reply({embeds: [dailyEmbed], ephemeral: true})
        }
        else {
            const dailyEmbed = new EmbedBuilder()
            .setDescription(`💰 You have collected your daily \`250 bitties\` amount`)
            userData.wallet += 250;
            userData.cooldowns.daily = new Date().setHours(24,0,0,0)
            await userData.save();
            
            return interaction.reply({ embeds: [dailyEmbed] })
    }
        
     }}