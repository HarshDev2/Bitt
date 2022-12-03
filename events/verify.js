const { Events, EmbedBuilder, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType} = require('discord.js');
const { Verification } = require('../models/verificationSchema')
const { Captcha } = require('captcha-canvas')

const captcha = new Captcha();
    captcha.async = true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha()
    const captchaAnswer = captcha.text;

module.exports = {
	name: Events.InteractionCreate,

	async execute(interaction, client) {
		if (interaction.isButton()){
            if (interaction.customId === 'verify') {
                await interaction.deferReply({ephemeral: true});
                const member = await interaction.guild.members.cache.get(interaction.member.user.id) || await interaction.guild.members.fetch(interaction.member.user.id).catch(err => {});

                const verificationData = await Verification.findOne({ServerID: interaction.member.guild.id})
                const role = interaction.guild.roles.cache.find(role => role.id === verificationData.RoleID);

                if (member.roles.cache.has(verificationData.RoleID)) {
                    return interaction.editReply({ content:`You are already verified`, ephemeral: true });
                }
                
                else if(!role) return interaction.editReply({content: 'Role not found, Please contact moderators!'})

                else {

                    const captchaImage = new AttachmentBuilder()
                    .setFile(await captcha.png)
                    .setName('captcha.png')
                
                    const captchaEmbed = new EmbedBuilder()
                    .setTitle('Verification Captcha')
                    .setColor('Yellow')
                    .setImage('attachment://captcha.png')
                    .setDescription(`Please enter the captcha text`)

                    const captchaRow = new ActionRowBuilder()
                    .addComponents([
                        new ButtonBuilder()
                        .setLabel('Answer')
                        .setCustomId('answer')
                        .setStyle(ButtonStyle.Success)
                    ])

                    await interaction.editReply({embeds: [captchaEmbed], files: [captchaImage], components: [captchaRow]});

                }
            }
            if (interaction.customId === 'answer') {
                const modal = new ModalBuilder()
		        	.setCustomId('verificationModal')
		        	.setTitle('Verification Input')
                    .addComponents([
		                new ActionRowBuilder().addComponents([
                            new TextInputBuilder()
		                	.setCustomId('captchaInput')
		                	.setLabel("Enter the Captcha.")
		                	.setStyle(TextInputStyle.Short),
                        ])
                    ]);
                interaction.showModal(modal);
            }                                  
    }
    if (interaction.type == 5) {
        const response = interaction.fields.getTextInputValue('captchaInput');

        if(response != captchaAnswer){
            interaction.reply({ content: 'Captcha Answer is incorrect!', ephemeral: true })
        }
        else{
            const verificationData = await Verification.findOne({ServerID: interaction.guild.id})

            const role = interaction.guild.roles.cache.find(role => role.id === verificationData.RoleID);
        
            await interaction.member.roles.add(role)
            interaction.reply({ content: 'Verification Sucessfully Completed', ephemeral: true });    
        
        }
    }
}
}