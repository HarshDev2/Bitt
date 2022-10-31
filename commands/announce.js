const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('announce anything in any channel!')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to announce')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Mesage that bot will say!')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('mention')
                .setDescription('Mention someone in the message.'))
        .addBooleanOption(option =>
            option.setName('embed')
                .setDescription('Message or Embed to be sent')),

	async execute(interaction) {
        await interaction.deferReply({ephemeral: true});

        const channel = interaction.options.getChannel("channel");
        const message = interaction.options.getString("message");
        const mention = interaction.options.getRole("mention");
        const embed = interaction.options.getBoolean("embed");

        const embedMessage = new EmbedBuilder()
            .setDescription(`${message}`)

        const permissions = channel.permissionsFor(interaction.member);

        if (!permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.editReply({content: 'You do not have permission to send messages in that channel'});

        if(!mention) {

            if(embed) return channel.send({embeds: [embedMessage]});
            else if(!embed) return channel.send(`${message}`);

        }
        else if(mention){
            if(embed) return channel.send({content: `${mention}`, embeds: [embedMessage]});
            else if(!embed) return channel.send(`${mention}, ${message}`);
        }

        await interaction.editReply({content: 'Message has been sucessfully sent'});

	}
};
