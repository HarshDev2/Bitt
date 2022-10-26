const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Starts a Quiz!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of questions.')
                .setRequired(true)
                .addChoices(
                    { name: 'History', value: 'History' },
                    { name: 'Arts', value: 'Arts' },
                    { name: 'Comics', value: 'Comics' },
                    { name: 'Computer', value: 'Computer' },
                    { name: 'Animals', value: 'Animals' },
                    { name: 'Films', value: 'Movies' },
                ))
        .addStringOption(option =>
            option.setName('difficulty')
                .setDescription('The difficulty of questions.')
                .addChoices(
                    { name: 'Easy', value: 'Easy' },
                    { name: 'Medium', value: 'Medium' },
                    { name: 'Hard', value: 'Hard' },
                )),

	async execute(interaction) {
        const category = interaction.options.getString('category');
        const difficulty = interaction.options.getString('difficulty');

		await interaction.reply(`You choosed ${category} Category and ${difficulty} Difficulty. \n \n Quiz is being built.`);
	},
};
