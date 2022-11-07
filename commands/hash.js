const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { createHash} = require('crypto')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hash')
		.setDescription('generates a hash for a given string')

        .addStringOption(option =>
            option.setName('string')
                .setDescription('string whose hash to be made.')
                .setRequired(true)),

	async execute(interaction) {
        const string = interaction.options.getString("string");
        const hash = createHash('sha256').update(string).digest('hex');

        const hashEmbed = new EmbedBuilder()
           .setTitle(`Hash for ${string}`)
           .setColor('Yellow')
           .setDescription(`Your hash is - \n \`\`\`md\n${hash}\n\`\`\``)
           .setTimestamp()

        console.log(hash)
        interaction.reply({embeds: [hashEmbed]});
	}
};
