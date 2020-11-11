const ytdlDiscord = require("ytdl-core-discord");
const ytdl = require("ytdl-core");
const scdl = require("soundcloud-downloader");
const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  async play(song, message) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    const { PRUNING, SOUNDCLOUD_CLIENT_ID } = require("../assets/config.json");
    const queue = message.client.queue.get(message.guild.id);

    const playemote = message.client.emojis.cache.get("755726642659459143");
    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      //* Ембед о законченом списке воспроизведения
      let queueend = new Discord.MessageEmbed()
        .setTitle(`Список воспроизведения закончен`)
        .setColor(success)
        .setThumbnail(
          "https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
        );

      return queue.textChannel.send(queueend).catch(console.error);
    }
    const songthumbnailurl = await song.url;
    const songthumbnail = await songthumbnailurl.split("?v=");
    ytdl.getInfo(songthumbnail[1]).then(async (info) => {
      let stream = null;
      let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
      try {
        if (song.url.includes("youtube.com")) {
          stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
        } else if (song.url.includes("soundcloud.com")) {
          try {
            stream = await scdl.downloadFormat(
              song.url,
              scdl.FORMATS.OPUS,
              SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
            );
          } catch (error) {
            stream = await scdl.downloadFormat(
              song.url,
              scdl.FORMATS.MP3,
              SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
            );
            streamType = "unknown";
          }
        }
      } catch (error) {
        if (queue) {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
        let errorembeds = new Discord.MessageEmbed()
          .setTitle(`Случилась непредвиденная ошибка.`)
          .setDescription("Ошибка:\n ```" + error + "```")
          .setColor(fail)
          .setThumbnail(
            `https://thumbs.gfycat.com/OldPalatableDugong-small.gif`
          );
        console.error(error);
        return message.channel.send(errorembeds);
      }

      queue.connection.on("disconnect", () =>
        message.client.queue.delete(message.guild.id)
      );

      const dispatcher = queue.connection
        .play(stream, { type: streamType })
        .on("finish", () => {
          if (collector && !collector.ended) collector.stop();

          if (queue.loop) {
            // if loop is on, push the song back at the end of the queue
            // so it can repeat endlessly
            let lastSong = queue.songs.shift();
            queue.songs.push(lastSong);
            module.exports.play(queue.songs[0], message);
          } else {
            // Recursively play the next song
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
        })
        .on("error", (err) => {
          console.error(err);
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        });
      dispatcher.setVolumeLogarithmic(queue.volume / 100);

      try {
        function truncated(num) {
          return Math.trunc(num * 100) / 100;
        }
        //* Ембед о треке

        const stars = require("../assets/rating.json");
        const rating = await info.player_response.videoDetails.averageRating;
        const ratingsplit = await Math.round(rating);
        const displaystars = await stars[ratingsplit];
        let playingmusic = new Discord.MessageEmbed()
          .setTitle(`${playemote} Сейчас играет: **${song.title}**`)
          .setURL(`${song.url}`)
          .setDescription(
            `Из канала: ${info.videoDetails.author.name}\nРейтинг: ${displaystars}`
          )
          .setFooter(
            `👍${info.videoDetails.likes}     👎${info.videoDetails.dislikes}     👁‍🗨${info.player_response.videoDetails.viewCount}`
          )
          .setColor(success)
          .setThumbnail(
            `https://img.youtube.com/vi/${songthumbnail[1]}/maxresdefault.jpg`
          );
        var playingMessage = await queue.textChannel.send(playingmusic);

        await playingMessage.react("⏭");
        await playingMessage.react("⏯");
        await playingMessage.react("🔇");
        await playingMessage.react("🔉");
        await playingMessage.react("🔊");
        await playingMessage.react("🔁");
        await playingMessage.react("⏹");
      } catch (error) {
        console.error(error);
      }

      const filter = (reaction, user) => user.id !== message.client.user.id;
      var collector = playingMessage.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000,
      });

      collector.on("collect", (reaction, user) => {
        //* Ембед о скипе
        let skipsong = new Discord.MessageEmbed()
          .setTitle(`${user.username} ⏩ скипнул песню`)
          .setColor(success)
          .setThumbnail(
            "https://i.pinimg.com/originals/cc/98/ee/cc98eee389f51e826aaa6c98feaf8906.gif"
          );

        if (!queue) return;
        const member = message.guild.member(user);

        switch (reaction.emoji.name) {
          case "⏭":
            queue.playing = true;
            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            queue.connection.dispatcher.end();
            queue.textChannel.send(skipsong).catch(console.error);
            collector.stop();
            break;

          case "⏯":
            //* Ембед о паузе
            let pausesong = new Discord.MessageEmbed()
              .setTitle(`${user.username} ⏸ поставил на паузу.`)
              .setColor(success)
              .setThumbnail(
                "https://assets.materialup.com/uploads/e1df752f-6402-4ccf-8fb7-a55bee8e183d/preview.gif"
              );
            let resumesong = new Discord.MessageEmbed()
              .setTitle(`${user.username} ▶ снял трек с паузы!`)
              .setColor(success)
              .setThumbnail(
                "https://assets.materialup.com/uploads/e1df752f-6402-4ccf-8fb7-a55bee8e183d/preview.gif"
              );

            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            if (queue.playing) {
              queue.playing = !queue.playing;
              queue.connection.dispatcher.pause(true);
              queue.textChannel.send(pausesong).catch(console.error);
            } else {
              queue.playing = !queue.playing;
              queue.connection.dispatcher.resume();
              queue.textChannel.send(resumesong).catch(console.error);
            }
            break;

          case "🔇":
            //* Ембед о анмуте
            let unmutesong = new Discord.MessageEmbed()
              .setTitle(`${user.username} 🔊 включил звук!`)
              .setColor(success)
              .setThumbnail("https://i.gifer.com/VSfy.gif");
            //* Ембед о муте
            let mutesong = new Discord.MessageEmbed()
              .setTitle(`${user.username} 🔇 выключил звук!`)
              .setColor(success)
              .setThumbnail("https://i.gifer.com/VSfy.gif");

            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            if (queue.volume <= 0) {
              queue.volume = 100;
              queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
              queue.textChannel.send(unmutesong).catch(console.error);
            } else {
              queue.volume = 0;
              queue.connection.dispatcher.setVolumeLogarithmic(0);
              queue.textChannel.send(mutesong).catch(console.error);
            }
            break;

          case "🔉":
            //* Ембед о снижении громкости
            let lowvolumesong = new Discord.MessageEmbed()
              .setTitle(
                `${user.username} 🔉 уменьшил громкость.\nГромкость сейчас: ${queue.volume}%`
              )
              .setColor(success)
              .setThumbnail(
                "https://thumbs.gfycat.com/MildOptimalKentrosaurus-small.gif"
              );

            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            if (queue.volume - 10 <= 0) queue.volume = 0;
            else queue.volume = queue.volume - 10;
            queue.connection.dispatcher.setVolumeLogarithmic(
              queue.volume / 100
            );
            queue.textChannel.send(lowvolumesong).catch(console.error);
            break;

          case "🔊":
            //* Ембед о добавлении громкости
            let highvolumesong = new Discord.MessageEmbed()
              .setTitle(
                `${user.username} 🔉 увеличил громкость.\nГромкость сейчас: ${queue.volume}%`
              )
              .setColor(success)
              .setThumbnail(
                "https://thumbs.gfycat.com/MildOptimalKentrosaurus-small.gif"
              );

            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            if (queue.volume + 10 >= 100) queue.volume = 100;
            else queue.volume = queue.volume + 10;
            queue.connection.dispatcher.setVolumeLogarithmic(
              queue.volume / 100
            );
            queue.textChannel.send(highvolumesong).catch(console.error);
            break;

          case "🔁":
            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            queue.loop = !queue.loop;
            //* Ембед о режиме повтора
            let loopsong = new Discord.MessageEmbed()
              .setTitle(
                `Режим повтора ${queue.loop ? "**включён**" : "**выключен**"}`
              )
              .setColor(success)
              .setThumbnail(
                "https://static.tildacdn.com/tild3433-6332-4730-b761-366135363730/loading.gif"
              );
            queue.textChannel.send(loopsong).catch(console.error);
            break;

          case "⏹":
            //* Ембед о остановке музыки
            let stopsong = new Discord.MessageEmbed()
              .setTitle(`${user.username} ⏹ остановил музыку!`)
              .setColor(success)
              .setThumbnail(
                "https://cdn.dribbble.com/users/26878/screenshots/3657037/21-playpause.gif"
              );
            reaction.users.remove(user).catch(console.error);
            if (!canModifyQueue(member)) return;
            queue.songs = [];
            queue.textChannel.send(stopsong).catch(console.error);
            try {
              queue.connection.dispatcher.end();
            } catch (error) {
              console.error(error);
              queue.connection.disconnect();
            }
            collector.stop();
            break;

          default:
            reaction.users.remove(user).catch(console.error);
            break;
        }
      });

      collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        if (PRUNING && playingMessage && !playingMessage.deleted) {
          playingMessage.delete({ timeout: 3000 }).catch(console.error);
        }
      });
    });
  },
};
