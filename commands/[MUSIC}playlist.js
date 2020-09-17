const { success, fail } = require("../assets/colors.json");
const config = require("../assets/config.json");
const Discord = require("discord.js");
const { play } = require("../include/play");
const {
  YOUTUBE_API_KEY,
  MAX_PLAYLIST_SIZE,
  SOUNDCLOUD_CLIENT_ID,
} = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");

module.exports = {
  name: "playlist",
  cooldown: 3,
  aliases: ["pl"],
  description: "Воспроизводит плейлист из YouTube",
  async execute(client, message, args) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    const { PRUNING } = require("../assets/config.json");
    const { channel } = message.member.voice;
    //* Ембед оповещения о потребности быть в тот же канале что и пользователь (бот)
    let embedsamechannel = new Discord.MessageEmbed()
      .setTitle(`Вам нужно быть в том же канале что и ${client.user.username}`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    //* Ембед об использовании команды
    let embedusage = new Discord.MessageEmbed()
      .setTitle(
        `Использование: ${config.prefix}play <YouTube плейлист URL | Название плейлиста>`
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    //* Ембед для оповещение о потребности присоединения
    let joinfirstembed = new Discord.MessageEmbed()
      .setTitle("**Для начала присоеденитесь к голосовому каналу**")
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
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
    const loading = message.client.emojis.cache.get("755746596045455421");
    let checkplaylist = new Discord.MessageEmbed()
      .setTitle(`${loading} проверка плейлиста...`)
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/2c/bb/5e/2cbb5e95b97aa2b496f6eaec84b9240d.gif"
      );
    let notfound = new Discord.MessageEmbed()
      .setTitle(`Плейлист не найден!`)
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(embedsamechannel).catch(console.error);

    if (!args.length) return message.reply(embedusage).catch(console.error);
    if (!channel) return message.reply(joinfirstembed).catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.reply(cantconnectembed);
    if (!permissions.has("SPEAK")) return message.reply(cantspeakembed);

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true,
    };

    let song = null;
    let playlist = null;
    let videos = [];

    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, {
          part: "snippet",
        });
      } catch (error) {
        console.error(error);
        return message.reply(notfound).catch(console.error);
      }
    } else if (scdl.isValidUrl(args[0])) {
      if (args[0].includes("/sets/")) {
        message.channel.send(checkplaylist);
        playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
        videos = playlist.tracks.map((track) => ({
          title: track.title,
          url: track.permalink_url,
          duration: track.duration / 1000,
        }));
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, {
          part: "snippet",
        });
        playlist = results[0];
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, {
          part: "snippet",
        });
      } catch (error) {
        console.error(error);
        return message.channel.send(notfound).catch(console.error);
      }
    }

    videos.forEach((video) => {
      song = {
        title: video.title,
        url: video.url,
        duration: video.durationSeconds,
      };
      //* Ембед добавления видео в список
      let songadded = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} добавил трек **${song.title}**`)
        .setColor(success)
        .setThumbnail(
          "https://static.dribbble.com/users/1284740/screenshots/4053432/add_button_now.gif"
        );
      if (serverQueue) {
        serverQueue.songs.push(song);
        if (!PRUNING) message.channel.send(songadded).catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    let playlistEmbed = new Discord.MessageEmbed()
      .setTitle(`${playlist.title}`)
      .setURL(playlist.url)
      .setColor(success);

    if (!PRUNING) {
      playlistEmbed.setDescription(
        queueConstruct.songs.map(
          (song, index) => `${index + 1}. [${song.title}](${song.url})`
        )
      );
      if (playlistEmbed.description.length >= 2048)
        playlistEmbed.description =
          playlistEmbed.description.substr(0, 2007) +
          "\nПлейлист больше чем лимит символов...";
    }
    let playliststarted = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} Запустил плейлист`)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      )
      .setColor(success);
    await message.channel.send(playliststarted);
    await message.channel.send(playlistEmbed);

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      //* Ембед неопознанной ошибки

      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        let songerror = new Discord.MessageEmbed()
          .setTitle(
            "Я не смог присоеденится к голосовому каналу.\nОшибка:" +
              "`" +
              error +
              "`"
          )
          .setColor(fail)
          .setThumbnail(
            "https://thumbs.gfycat.com/OldPalatableDugong-small.gif"
          );
        await channel.leave();
        return message.channel.send(songerror).catch(console.error);
      }
    }
  },
};
