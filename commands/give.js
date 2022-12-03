const { User } = require("../models/userSchema");
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("give")
    .setDescription("give someone bitties")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("person to give bitties")
        .setRequired(true)
    )
    .addIntegerOption(
        option => option
        .setName("bitties")
        .setDescription("amount of bitties to give")
        .setRequired(true)
    ),
     async execute(interaction){
        const user = interaction.options.getUser("user");
        const amount = interaction.options.getInteger("bitties");

        const selfData = await User.findOne({id: interaction.member.user.id});
        const anotherData = await User.findOne({id: user.id});

        if(!selfData){
            const accountInvalidEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`You don't have a bitt's currency account, begin your journy by running \`/start\``)
    
                return interaction.reply({embeds: [accountInvalidEmbed]});
        }
        else if(!anotherData){
            const accountInvalidEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`${user.username} don't have a bitt's currency account.`)
    
                return interaction.reply({embeds: [accountInvalidEmbed]});
        }
        else if(selfData && anotherData){
            console.log('test 1 passed')
            if(selfData.wallet < amount){
                const giveEmbed = new EmbedBuilder()
                .setTitle('Give Comamnd Failed')
                .setColor('Red')
                .setDescription(`You need ${amount - selfData.wallet} bitties more to perform this action.`)

                return interaction.reply({embeds: [giveEmbed]})
            }
            else {
                const giveEmbed = new EmbedBuilder()
                .setTitle('Sucessfully Gave')
                .setColor('Gold')
                .setDescription(`Sucessfully gave ${user.username} ${amount} bitties, now you have ${selfData.wallet - amount} bitties.`)

                selfData.wallet -= amount;
                anotherData.wallet += amount;

                await selfData.save();
                await anotherData.save();
                return interaction.reply({embeds: [giveEmbed]});
            }
        }
    }
}