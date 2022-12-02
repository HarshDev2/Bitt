const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js")
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
            .setDescription('new role that will be given to users')))
    
        .addSubcommand(subcommand => subcommand.setName('channel')
            .setDescription('update the channel for verification')
            .addChannelOption(option => option.setName('channel')
            .setDescription('new channel where users can verify themselves')))),

    async execute(interaction) {
        const choosenSubcommand = interaction.options.getSubcommand();

        if(choosenSubcommand == 'enable'){
            const role = interaction.options.getRole('role');
            const channel = interaction.options.getChannel('channel');

            if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                return interaction.reply({content: 'You do not have Administrator permission to run this command.'})
            }
            else{
                console.log(channel.id)
                console.log(role.id);
                console.log(interaction.member.guild.id)

                await Verification.create({ ChannelID: channel.id, RoleID: role.id, ServerID: interaction.member.guild.id});

                interaction.reply('Sucessfully setted up verification.')
            }
        }
    }
}