const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('helpt')
		.setDescription('shows all the commands bot have'),

	async execute(interaction) {

        const HelpEmbed = new EmbedBuilder()
        .setColor(0x000000)
	    .setTitle('Bot Help!')
	    .setDescription('I use slash commands. \n \n **Bot Commands -** \n \n **Utility Commands ** \n \n ** /help ** \nshows this help page. \n \n ** /info ** \n  shows bot info. \n \n ** /announce ** \n announces a messge in embed or without embed in a specified channel. \n \n ** /purge ** \nclears any amount of messages you want.\n \n ** /role create ** \n Adds a role to the server. \n \n **/role delete ** \n Deletes a role from the server. \n \n ** /ban ** \n bans a user from the server. \n \n ** /unban ** \n unbans a user from the server. \n \n ** /nickname change ** \n changes the nickname of a user. \n \n ** Fun Commands ** \n \n ** /pfp ** \n shows a user profile picture. \n \n ** /ping ** \n replies with pong message. \n \n ** /gay ** \n shows gayrate of a user. \n \n ** /echo ** \n make the bot say whatever you want.')
		.setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')
	    .setTimestamp()
   
        


      let embeds = [
        new EmbedBuilder()
        .setColor(0x000000)
	    .setTitle('Bot Help!')
	    .setDescription('I use slash commands. \n \n **Bot Commands -** \n \n **Utility Commands ** \n \n ** /help ** \nshows this help page. \n \n ** /info ** \n  shows bot info. \n \n ** /userinfo ** \n get info about a user. \n \n ** /purge ** \nclears any amount of messages you want.\n \n ** /role create ** \n Adds a role to the server. \n \n **/role delete ** \n Deletes a role from the server.')
		.setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')
	    .setTimestamp(),

        new EmbedBuilder()
        .setTitle('Moderation Commands')
        .setDescription('** /nickname change ** \n changes nickname of a user. \n \n ** /kick ** \n  kicks a user from the server \n \n ** /ban ** \n bans a user from the server.')
		.setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')
	    .setTimestamp(),

        new EmbedBuilder()
        .setTitle('Fun Commands')
        .setDescription('** /gay ** \n shows your gayrate. \n \n ** /ping ** \n replies with pong. \n \n ** /say ** \n bot will say anything you want to say.')
		.setThumbnail('https://cdn.discordapp.com/avatars/1032836183065116722/b2628cef1a5640df7aac021d7e927b68.webp')
	    .setTimestamp(),
      ];
      await pagination(interaction, embeds);
    
  
  async function pagination(interaction, embeds) {
    let allbuttons = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
      .setStyle(ButtonStyle.Primary).setCustomId("0").setLabel("<<"),

      new ButtonBuilder()
      .setStyle(ButtonStyle.Primary).setCustomId("1").setLabel("<"),

      new ButtonBuilder()
      .setStyle(ButtonStyle.Danger).setCustomId("2").setLabel("x"),

      new ButtonBuilder()
      .setStyle(ButtonStyle.Primary).setCustomId("3").setLabel(">"),

      new ButtonBuilder()
      .setStyle(ButtonStyle.Primary).setCustomId("4").setLabel(">>"),
    ]);
    // send message if embeds is 1
    if (embeds.length === 1) {
      if (interaction.deferred) {
        return interaction.followUp({
          embeds: [embeds[0]],
        });
      } else {
        return interaction.reply({
          embeds: [embeds[0]],
          fetchReply: true,
        });
      }
    }
  
    embeds = embeds.map((embed, index) => {
      return embed.setFooter({
        text: `Page ${index + 1}/${embeds.length}`,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      });
    });

    if (interaction.deferred) {
      await interaction.followUp({
        embeds: [embeds[0]],
        components: [allbuttons],
      });
    } else {
    await interaction.reply({
        embeds: [embeds[0]],
        components: [allbuttons],
      });
    }
  
    let filter = (m) => m.member.id === interaction.member.id;
  
    const collector = await interaction.channel.createMessageComponentCollector({
      filter: filter,
      time: 30000,
    });
    let currentPage = 0;
    collector.on("collect", async (b) => {
      if (b.isButton()) {
        await b.deferUpdate().catch((e) => null);
        // page first
        switch (b.customId) {
          case "0":
            {
              if (currentPage != 0) {
                currentPage = 0;
                await interaction.editReply({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              }
            }
            break;
          case "1":
            {
              if (currentPage != 0) {
                currentPage -= 1;
                await interaction.editReply({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              } else {
                currentPage = embeds.length - 1;
                await interaction.editReply({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              }
            }
            break;
          case "2":
            {
              allbuttons.components.forEach((btn) => btn.setDisabled(true));
              await interaction.editReply({
                  embeds: [embeds[currentPage]],
                  components: [allbuttons],
                })
                .catch((e) => null);
            }
            break;
          case "3":
            {
              if (currentPage < embeds.length - 1) {
                currentPage++;
                await interaction.editReply({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              } else {
                currentPage = 0;
                await interaction.editReply({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              }
            }
            break;
          case "4":
            {
              currentPage = embeds.length - 1;
              await interaction.editReply({
                  embeds: [embeds[currentPage]],
                  components: [allbuttons],
                })
                .catch((e) => null);
            }
            break;
  
          default:
            break;
        }
      }
    });
  
    collector.on("end", async () => {
      allbuttons.components.forEach((btn) => btn.setDisabled(true));
      await interaction.editReply({
          embeds: [embeds[currentPage]],
          components: [allbuttons],
        })
        .catch((e) => null);
    });
  }
},
};
  