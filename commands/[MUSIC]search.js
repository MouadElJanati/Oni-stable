const Discord = require("discord.js");
const { YOUTUBE_API_KEY, prefix } = require("../assets/config.json");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { success, fail } = require("../assets/colors.json");

module.exports = {
  name: "search",
  description: "Ищет треки по названию что б их проиграть",
  async execute(client, message, args) {
    message.react("🔎");
    message.delete({ timeout: 3000 });
    //* Ембед для оповещение о потребности присоединения
    let joinfirsttembed = new Discord.MessageEmbed()
      .setTitle("**Для начала присоеденитесь к голосовому каналу**")
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    //* Ембед уже запущено голосование
    let alreadysearch = new Discord.MessageEmbed()
      .setTitle(
        "**Уже запущен поиск в этом канале! Выберите один из вариантов.**"
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    //* Ембед об использовании команды
    let embedusage = new Discord.MessageEmbed()
      .setTitle(
        `Использование: ${prefix}${module.exports.name} <Название видео>`
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    if (!args.length) return message.reply(embedusage).catch(console.error);
    if (message.channel.activeCollector) return message.reply(alreadysearch);
    if (!message.member.voice.channel)
      return message.reply(joinfirsttembed).catch(console.error);
    const searchemote = message.client.emojis.cache.get("755733004512657468");
    const search = args.join(" ");

    let resultsEmbed = new Discord.MessageEmbed()
      .setTitle(`${searchemote} Результаты для запроса: ${search}`)
      .setFooter("Впишите одно из чисел: 1-7")
      .setThumbnail(
        "https://thumbs.gfycat.com/NauticalDeadHairstreak-small.gif"
      )
      .setColor(success);

    try {
      const results = await youtube.searchVideos(search, 7);
      results.map((video, index) =>
        resultsEmbed.addField(
          `Канал: ${video.channel.title}`,
          `[${index + 1}. ${video.title}](${video.shortURL})`
        )
      );

      var resultsMessage = await message.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /(^[1-9][0-9]{0,1}$)/g;
        return (
          pattern.test(msg.content) &&
          parseInt(msg.content.match(pattern)[0]) <= 10
        );
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30000,
        errors: ["time"],
      });
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
      const doneemote = message.client.emojis.cache.get("755736806087196764");

      message.channel.activeCollector = false;
      message.client.commands
        .get("play")
        .execute(client, message, args, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  },
};
