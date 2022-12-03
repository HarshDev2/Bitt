const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { User } = require("../models/userSchema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("withdraw bitties from your bank to wallet.")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("Amount to withdraw")
        .setRequired(true)
        .setMinValue(1)
    ),
    async execute(interaction) {
        const user = interaction.member.user;
        const amount = interaction.options.getNumber("amount")
        const userData = await User.findOne({ id: user.id })

        if(!userData){
            const accountInvalidEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('Your do not have an bitt\'s currency account, please continue with `/start`.')

            return interaction.reply({embeds: [accountInvalidEmbed]})
        }
        else if (userData.bank < amount){
            const withdrawEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`💰 You need \`${amount - userData.bank} bitties\` more in your bank to withdraw money`)
            return interaction.reply({embeds: [withdrawEmbed]})
        }

        else{
            const withdrawEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`✅ You have withdrawn \`${amount} bitties\` amount into your wallet.`)

            userData.bank -= amount;
            userData.wallet += amount;
            await userData.save(); 

            return interaction.reply({embeds: [withdrawEmbed]})
        }
    }
}