const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const math = require('mathjs');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('math')
                .setDescription('do you maths homework..')
                .addSubcommand(
                        (subcommand) => subcommand.setName('equation')
                                .setDescription('completes your maths equation.')

                                .addStringOption((option) => option.setName('equation')
                                        .setDescription('equation that\'s result you want!')
                                        .setRequired(true))

                )
                .addSubcommand((subcommand) => subcommand.setName('squareroot')
                        .setDescription('get square root of a number.')

                        .addIntegerOption((option) => option.setName('number')
                                .setDescription('number whose square root is to be done.')
                                .setRequired(true))
                )
                .addSubcommand((subcommand) => subcommand.setName('power')
                        .setDescription('get any number with the respective power')

                        .addIntegerOption((option) => option.setName('number')
                                .setDescription('tell the number..')
                                .setRequired(true))
                        .addIntegerOption((option) => option.setName('power')
                                .setDescription('power od the number..')
                                .setRequired(true))
                ),

        async execute(interaction) {
                const selectedSubcommand = interaction.options.getSubcommand()

                if(selectedSubcommand === 'equation'){
                        const equation = interaction.options.getString('equation');
                        const mathEmbed = new EmbedBuilder()
                                .setColor('Gold')
                                .setTitle(`Result`)
                                .setDescription(`Result for \`${equation}\` is \`${math.evaluate(equation)}\`.`)
                                .setTimestamp();
                        interaction.reply({ embeds: [mathEmbed] });
                }
                if(selectedSubcommand === 'squareroot'){
                        const number = interaction.options.getInteger('number');
                        const mathEmbed = new EmbedBuilder()
                                .setColor('Gold')
                                .setTitle(`Result`)
                                .setDescription(`Square root of \`${number}\` is \`${Math.sqrt(number)}\`.`)
                                .setTimestamp();
                        interaction.reply({ embeds: [mathEmbed] });
                }
                if(selectedSubcommand === 'power'){
                        const number = interaction.options.getInteger('number');
                        const power = interaction.options.getInteger('power');
                        const mathEmbed = new EmbedBuilder()
                                .setColor('Gold')
                                .setTitle(`Result`)
                                .setDescription(`Result for \`${number}^${power}\` is \`${Math.pow(number, power)}\`.`)
                                .setTimestamp();
                        interaction.reply({ embeds: [mathEmbed] });
                }
        }
};
