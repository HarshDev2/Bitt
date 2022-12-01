const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { User } = require("../models/userSchema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit your wallet money to bank")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("Amount to deposit")
        .setRequired(true)
        .setMinValue(1) //should be more than 100 coins
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
        else if (userData.wallet < amount){
            const depositEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`💰 You need \` ${amount - userData.wallet} :coin: \` more in your wallet to deposit money`)
            return interaction.reply({embeds: [depositEmbed]})
        }

        else{
            const depositEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`✅ You have deposited \` ${amount} :coin: \` amount into your bank account`)

            userData.wallet -= amount
            userData.bank += amount
            await userData.save(); 

            return interaction.reply({embeds: [depositEmbed]})
        }
    }
}