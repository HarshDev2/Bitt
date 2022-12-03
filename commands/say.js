const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('make the bot say anything!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('message that bot will say')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('embed')
                .setDescription('messge to be sent in embed format or not')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('channel where you have to say something')),

	async execute(interaction) {
        await interaction.deferReply({ephemeral: true})

        const message = interaction.options.getString('message');
        const embed = interaction.options.getBoolean('embed');
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        const permissions = channel.permissionsFor(interaction.member);

        if (!permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.editReply({content: 'You do not have permission to send messages in that channel'});
      
        if(embed == true){
            if(message.includes("<@") && message.includes(">")){
                return interaction.editReply({content: 'You can not ping someone in a message.', ephemeral:true })
            }
            const messageEmbed = new EmbedBuilder()
	        .setDescription(message)

            await channel.send({embeds: [messageEmbed]});
            interaction.editReply({content: 'Message Sent!'});

            const guild = interaction.guild;
		    const member = guild.members.cache.get('1039017367558176889') ||  guild.members.fetch('1039017367558176889').catch(err => {});
		    console.log(guild);
		    console.log(member);
		    member.setNickname('Bitty')
        }
        else if(embed == false){
            if(message.includes("<@") && message.includes(">")){
                return interaction.editReply({content: 'You can not ping someone in a message.', ephemeral:true })
            }
            await channel.send(message)
            interaction.editReply({content: 'Message Sent!'});
        }
	},
};
