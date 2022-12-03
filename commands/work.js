const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { User } = require("../models/userSchema")
const prettyMilliseconds = require('pretty-ms');

const jobs = [
    "🧑‍🏫 Teacher",
    "🧑‍⚕️ Doctor",
    "👮 Police Officer",
    "🧑‍🍳 Chef",
    "🧑‍🚒 Firefighter",
    "🚌 Bus Driver",
    "🧑‍🔬 Scientist",
    "📮 Postman",
    "🧑‍🏭 Engineer",
    "🧑‍🎨 Artist",
    "🧑‍✈️ Pilot"
]


module.exports = {
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to earn money"),
     async execute(interaction) {
        const user = interaction.member.user;
        const userData = await User.findOne({ id: user.id });

        if(!userData){
            const accountInvalidEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('Your do not have an bitt\'s currency account, please continue with `/start`.')

            return interaction.reply({embeds: [accountInvalidEmbed]})
        }
        else if (userData.cooldowns.work > Date.now()){
            const workEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(`⌛ You can work again in **\`${prettyMilliseconds(userData.cooldowns.work - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
           

            return interaction.reply({ embeds: [workEmbed], ephemeral: true })
        }
        else{
        const amount = Math.floor(Math.random() * 1000)
        const job = jobs[Math.floor(Math.random() * jobs.length)]

        userData.wallet += amount;
        userData.cooldowns.work = Date.now() + (1000 * 60 * 60);
        await userData.save()

        const workEmbed = new EmbedBuilder()
            .setDescription(`You worked as a ** ${job} ** and earned \`${amount} bitties\``)
            .setColor("Yellow")

        return interaction.reply({ embeds: [workEmbed] })
        }
    }
}