const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder } = require("discord.js")
const { User } = require("../models/userSchema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your or another user's balance")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person whose balance you want to check")
    ),
     async execute(interaction){
        const user = interaction.options.getUser("user");

        if(user){
            const userData = await User.findOne({ id: user.id})

            if(!userData){
                const accountInvalidEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`${user.username} do not have an bitt's currency account.`)
    
                return interaction.reply({embeds: [accountInvalidEmbed]});
            }
            else if(userData){
                const balanceEmbed = new EmbedBuilder()
        
                .setTitle(`${user.username}'s balance`)
                .setDescription("Note: wallet and bank details of requested user")
                .setColor("Yellow")
                .setThumbnail(user.displayAvatarURL())
                .addFields(
                    { name: '• Wallet', value: `**\` ${userData.wallet} :coin: \`**`, inline: true},
                    { name: '• Bank', value: `**\` ${userData.bank} :coin: \`**`, inline: true},
                
                )
                return interaction.reply({embeds: [balanceEmbed]})
            }
        }
        if(!user){
            const userData = await User.findOne({ id: interaction.user.id})

            if(!userData){
                const accountInvalidEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('Your do not have an bitt\'s currency account, please continue with `/start`.')
    
                return interaction.reply({embeds: [accountInvalidEmbed]});
            }
            else if(userData){
                const balanceEmbed = new EmbedBuilder()
        
                .setTitle(`${interaction.member.user.username}'s balance`)
                .setDescription("Note: wallet and bank details of requested user")
                .setColor("Yellow")
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .addFields(
                    { name: '• Wallet', value: `** ${userData.wallet} :coin: **`, inline: true},
                    { name: '• Bank', value: `** ${userData.bank} :coin: **`, inline: true},
                
                )
                return interaction.reply({embeds: [balanceEmbed]})
            }
        }
    }
}