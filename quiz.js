const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Starts a Quiz!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of questions.')
                .setRequired(true)
                .addChoices(
                    { name: 'History', value: '23' },
                    { name: 'Arts', value: '25' },
                    { name: 'Comics', value: '29' },
                    { name: 'Computer', value: '18' },
                    { name: 'Animals', value: '27' },
                ))
        .addStringOption(option =>
            option.setName('difficulty')
                .setDescription('The difficulty of questions.')
                .setRequired(true)
                .addChoices(
                    { name: 'Easy', value: 'easy' },
                    { name: 'Medium', value: 'medium' },
                    { name: 'Hard', value: 'hard' },
                )),

	async execute(interaction) {
        await interaction.deferReply();
        const category = interaction.options.getString('category');
        const difficulty = interaction.options.getString('difficulty');
        
                const response = await fetch(`https://opentdb.com/api.php?amount=12&category=${category}&difficulty=${difficulty}&type=boolean`);
                const data = await response.json()
                

                if (data.response_code !== 0) throw (`Error Code: ${data.response_code}`);
                if (!data.results.length) throw "No Questions!";

                const results = data.results;

                console.log(results[0]);

                const first_question = results[0].question;
                const first_correctAnswer = results[0].correct_answer;

                const second_question = results[1].question;
                const second_correctAnswer = results[1].correct_answer;

                const third_question = results[2].question;
                const third_correctAnswer = results[2].correct_answer;

                const fourth_question = results[3].question;
                const fourth_correctAnswer = results[3].correct_answer;

                const first_questionEmbed = new EmbedBuilder()
                .setDescription(first_question)

                const second_questionEmbed = new EmbedBuilder()
                .setDescription(second_question)

                const third_questionEmbed = new EmbedBuilder()
                .setDescription(third_question)

                const fourth_questionEmbed = new EmbedBuilder()
                .setDescription(fourth_question)

                const booleanAnswersRow = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setCustomId('True')
			    		.setLabel('True')
			    		.setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
			    		.setCustomId('False')
			    		.setLabel('False')
			    		.setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
			    		.setCustomId('stop')
			    		.setLabel('Stop')
			    		.setStyle(ButtonStyle.Danger)
                );

                await interaction.editReply({embeds: [first_questionEmbed], components: [booleanAnswersRow]})
            
                const collector = interaction.channel.createMessageComponentCollector({max: 1});
        
                    collector.on("collect", async button => {
                        button.deferUpdate();
                    });
                
                    collector.on('end', async (collected) => {
                        const userAnswer = collected.first().customId;
    
                    const correctAnswerEmbed = new EmbedBuilder().setTitle(`Correct! Answer is ${first_correctAnswer}`).setDescription(`${first_question}`);
                    const wrongAnswerEmbed = new EmbedBuilder().setTitle(`Wrong!  Answer is ${first_correctAnswer}`).setDescription(`${first_question}`)
                
                    if(userAnswer == first_correctAnswer){
		                interaction.editReply({embeds: [correctAnswerEmbed], components: []});
                        interaction.followUp({embeds: [second_questionEmbed], components: [booleanAnswersRow]})

                        const collector = interaction.channel.createMessageComponentCollector({max: 1});
        
                        collector.on("collect", async button => {
                            button.deferUpdate();
                        });
                    
                        collector.on('end', async (collected) => {
                            const userAnswer = collected.first().customId;
                        
                        const correctAnswerEmbed = new EmbedBuilder().setTitle(`Correct! Answer is ${second_correctAnswer}`).setDescription(`${second_question}`);
                        const wrongAnswerEmbed = new EmbedBuilder().setTitle(`Wrong!  Answer is ${second_correctAnswer}`).setDescription(`${second_question}`)
                        
                        if(userAnswer == second_correctAnswer){
		                    interaction.editReply({embeds: [correctAnswerEmbed], components: []});
                            interaction.followUp({embeds: [third_questionEmbed], components: [booleanAnswersRow]})
                        }
                        else if(userAnswer != second_correctAnswer){
		                    interaction.editReply({embeds: [wrongAnswerEmbed], components: []});
                            interaction.followUp({embeds: [third_questionEmbed], components: [booleanAnswersRow]})
                        }
                        
                        });
                    }
                    else if(userAnswer != first_correctAnswer){
		                interaction.editReply({embeds: [wrongAnswerEmbed], components: []});
                        interaction.followUp({embeds: [second_questionEmbed], components: [booleanAnswersRow]})
                        const collector = interaction.channel.createMessageComponentCollector({max: 1});
        
                        collector.on("collect", async button => {
                            button.deferUpdate();
                        });
                    
                        collector.on('end', async (collected) => {
                            const userAnswer = collected.first().customId;
                        
                        const correctAnswerEmbed = new EmbedBuilder().setTitle(`Correct! Answer is ${second_correctAnswer}`).setDescription(`${second_question}`);
                        const wrongAnswerEmbed = new EmbedBuilder().setTitle(`Wrong!  Answer is ${second_correctAnswer}`).setDescription(`${second_question}`)
                        
                        if(userAnswer == second_correctAnswer){
		                    interaction.editReply({embeds: [correctAnswerEmbed], components: []});
                            interaction.followUp({embeds: [third_questionEmbed], components: [booleanAnswersRow]})
                        }
                        else if(userAnswer != second_correctAnswer){
		                    interaction.editReply({embeds: [wrongAnswerEmbed], components: []});
                            interaction.followUp({embeds: [third_questionEmbed], components: [booleanAnswersRow]})
                        }
                        
                        });
                    }
            
        });
    }
}