const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { Verification} = require('../models/verificationSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("verification")
    .setDescription("withdraw bitties from your bank to wallet.")
    .addSubcommand(subcommand => subcommand.setName('enable')
        .setDescription('enable verification in the server')
        .addRoleOption(option => option.setName('role')
        .setDescription('role that will be given after verification')
        .setRequired(true))

        .addChannelOption(option => option.setName('channel')
        .setDescription('channel where users can verify them')
        .setRequired(true))
    )
    .addSubcommandGroup(subcommandgroup => subcommandgroup.setName('update')
        .setDescription('update the verification commands')
        .addSubcommand(subcommand => subcommand.setName('role')
            .setDescription('update the role for verification')
            .addRoleOption(option => option.setName('role')
                .setDescription('new role that will be given to users')
                .setRequired(true)))
    
        .addSubcommand(subcommand => subcommand.setName('channel')
            .setDescription('update the channel for verification')
            .addChannelOption(option => option.setName('channel')
                .setDescription('new channel where users can verify themselves')
                .setRequired(true))))

    .addSubcommandGroup(subcommandgroup => subcommandgroup.setName('resend')
        .setDescription('resend something')
        .addSubcommand(subcommand => subcommand.setName('message')
            .setDescription('resend verification message in the server'))),

    async execute(interaction) {
        const choosenSubcommand = interaction.options.getSubcommand();
        const captchaEmbed = new EmbedBuilder()
                .setTitle('Verify yourself!')
                .setDescription('Click on the verify button to start the verification process')
                .setTimestamp()

        const captchaRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel('Verify!')
            .setCustomId('verify')
        )
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            return interaction.reply({content: 'You do not have Administrator permission to run this command.'})
        }
        else if(choosenSubcommand == 'enable'){
            const role = interaction.options.getRole('role');
            const channel = interaction.options.getChannel('channel');
            const data = Verification.findOne({ServerID: interaction.serverId})

            const failedEmbed = new EmbedBuilder()
            .setTitle('Verication Enable Failed')
            .setDescription('Verification System is already enabled in this server. \n Please use \`/verification resend messaage` to send verification message again.')

            if(data) return interaction.reply({embeds: [failedEmbed], ephemeral: true})
            else{
                await Verification.create({ ChannelID: channel.id, RoleID: role.id, ServerID: interaction.member.guild.id});

                await channel.send({embeds: [captchaEmbed], components: [captchaRow]})
                return interaction.reply('Sucessfully setted up verification.')
            }
        }
        else if(choosenSubcommand == 'role'){
            const role = interaction.options.getRole('role');
            const SucessEmbed = new EmbedBuilder()
            .setTitle('Verification Role Updated')
            .setColor('Yellow')
            .setDescription(`Responsible Moderator : <@${interaction.member.user.id}> \n New Verification Role : ${role} \n \n Verification role is updated by new verification Role Sucessfully.`)
            .setTimestamp()

            await Verification.findOneAndUpdate({ServerID: interaction.guildId}, {RoleID: role.id})
            return interaction.reply({embeds: [SucessEmbed]})
        }
        else if(choosenSubcommand == 'channel'){
            const channel = interaction.options.getChannel('channel');
            const SucessEmbed = new EmbedBuilder()
            .setTitle('Verification Channel Updated')
            .setColor('Yellow')
            .setDescription(`**Responsible Moderator** : <@${interaction.member.user.id}> \n  \n**New Verification Channel** : ${channel} \n \n Verification message has been sent. \n Please continue by deleting the old channel or deleting old verification message.`)
            .setTimestamp()

            await Verification.findOneAndUpdate({ServerID: interaction.guildId}, {ChannelID: channel.id})
            await channel.send({embeds: [captchaEmbed], components: [captchaRow]})
            return interaction.reply({embeds: [SucessEmbed]})
        }
        else if(choosenSubcommand == 'message'){
            const verificationData = await Verification.findOne({ServerID: interaction.guild.id});
        
            const SucessEmbed = new EmbedBuilder()
            .setTitle('Verification Message Sent')
            .setColor('Yellow')
            .setDescription(`Verification Message has been sent sucessfully. \n Please continue by deleting the old verification message.`)
            .setTimestamp()

            const channel = await interaction.guild.channels.fetch(verificationData.ChannelID);

            await channel.send({embeds: [captchaEmbed], components: [captchaRow]})
            interaction.reply({embeds: [SucessEmbed]})
        }
    }
}