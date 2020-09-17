const { play } = require("../include/play");
const {
  YOUTUBE_API_KEY,
  SOUNDCLOUD_CLIENT_ID,
  prefix,
} = require("../assets/config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");

module.exports = {
  name: "play",
  cooldown: 3,
  aliases: ["p"],
  description: "Проигрывает аудио из YouTube или SoundCloud",
  async execute(client, message, args) {
    const doneemote = message.client.emojis.cache.get("755736806087196764");

    //* Ембед для оповещение о потребности присоединения
    let joinfirstembed = new Discord.MessageEmbed()
      .setTitle("**Для начала присоеденитесь к голосовому каналу**")
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );

    //* Ембед оповещения о потребности быть в тот же канале что и пользователь (бот)
    let embedsamechannel = new Discord.MessageEmbed()
      .setTitle(`Вам нужно быть в том же канале что и ${client.username}`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );

    //* Ембед об использовании команды
    let embedusage = new Discord.MessageEmbed()
      .setTitle(
        `Использование: ${prefix}play <YouTube URL | Название видео | Soundcloud URL>`
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );

    //* Ембед ошибки отсутствия разрешения подключения
    let cantconnectembed = new Discord.MessageEmbed()
      .setTitle(
        `Не могу присоедениться к голосовому каналу, отсутствует разрешение`
      )
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    //* Ембед отсутствия разрешения говорить
    let cantspeakembed = new Discord.MessageEmbed()
      .setTitle(
        `Я не могу говорить в этом канале, убедитесь что у меня есть права на это!`
      )
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    //* Ембед не найдено трека SoundCloud
    let scnotfound = new Discord.MessageEmbed()
      .setTitle(`Я не могу найти этот трек на Soundcloud`)
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    //* Ембед SoundCloud ошибка
    let scerror = new Discord.MessageEmbed()
      .setTitle(`Случилась ошибка при проигрывания трека из Soundcloud`)
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    //* Ембед Видео не найдено
    let ytnotfound = new Discord.MessageEmbed()
      .setTitle(`Ой-ой! Мы не смогли найти видео с таким названием.`)
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.reply(joinfirstembed).catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(embedsamechannel).catch(console.error);

    if (!args.length) return message.reply(embedusage).catch(console.error);
    let waitplease = new Discord.MessageEmbed()
      .setTitle(`${doneemote} Хорошо! Скоро мы запустим Ваш трек.`)
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    message.channel
      .send(waitplease)
      .then((message) => message.delete({ timeout: 8000 }));
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.reply(cantconnectembed);
    if (!permissions.has("SPEAK")) return message.reply(cantspeakembed);

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true,
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
          title: trackInfo.title,
          url: trackInfo.permalink_url,
          duration: Math.ceil(trackInfo.duration / 1000),
        };
      } catch (error) {
        if (error.statusCode === 404)
          return message.reply(scnotfound).catch(console.error);
        return message.reply(scerror).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
        };
      } catch (error) {
        console.error(error);
        return message.reply(ytnotfound).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      //* Ембед добавления видео в список
      let songadded = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} добавил трек **${song.title}**`)
        .setColor(success)
        .setThumbnail(
          "https://static.dribbble.com/users/1284740/screenshots/4053432/add_button_now.gif"
        );
      return serverQueue.textChannel.send(songadded).catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      //* Ембед неопознанной ошибки
      let songerror = new Discord.MessageEmbed()
        .setTitle(
          "Я не смог присоеденится к голосовому каналу.\nОшибка:" +
            "`" +
            error +
            "`"
        )
        .setColor(fail)
        .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");

      return message.channel.send(songerror).catch(console.error);
    }
  },
};
