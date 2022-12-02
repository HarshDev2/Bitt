const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const { User } = require("../models/userSchema");
const { Verification } = require("../models/verificationSchema");
const { Captcha } = require('captcha-canvas')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("get verified..")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("verify a user!")
    ),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.member;
        const member = await interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {});

        const verificationData = await Verification.findOne({ServerID: interaction.member.guild.id})

        if (member.roles.cache.has(verificationData.RoleID)) {
            return interaction.reply({ content:`${member.user.username} are already verified`, ephemeral: true });
        }
        else {
            const random = Math.floor(Math.random() * 5)

            if(1 || 2 || 3 || 4 ||5){

                const captcha = new Captcha();
                captcha.async = true;
                captcha.addDecoy();
                captcha.drawTrace();
                captcha.drawCaptcha();

                const captchaImage = new AttachmentBuilder()
                .setFile(await captcha.png)
                .setName('captcha.png')

                const captchaEmbed = new EmbedBuilder()
                .setTitle('Verification Captcha')
                .setColor('Yellow')
                .setImage('attachment://captcha.png')
                .setDescription(`Please enter the captcha text`)

                const captchaRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel('Answer')
                    .setCustomId('answer'),
                )

                const captchaModal = new ModalBuilder()
                .setTitle('Verification')
                .setCustomId('verificationModel')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setLabel('Enter the Captcha Text.')
                        .setStyle(TextInputStyle.Short)
                        .setCustomId('captchaInput')
                    )
                )
                return interaction.reply({embeds: [captchaEmbed], files: [captchaImage], components: [captchaRow], ephemeral: true});
            }
            member.roles.add(verificationData.RoleID)
            return interaction.reply({ content: `${member.user.username} is now verified`, ephemeral: true });
        }
    }
}