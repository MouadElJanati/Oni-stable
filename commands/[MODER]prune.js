const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "prune",
  description: "Команда очищает до 99 сообщений за раз.",
  execute(client, message, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply(
        "допускаются только числовые значения для этой команды."
      );
    } else if (amount <= 1 || amount > 100) {
      return message.reply("Вам нужно указать число от 1 к 99.");
    }

    message.channel.bulkDelete(amount, true);
    const embed = new Discord.MessageEmbed()
      .setTitle(`✔ Отлично, я удалил для Вас ${amount - 1} сообщений.`)
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/b0/b7/6a/b0b76ac4bdc39d353728c2be07201c6c.gif"
      );
    const failembed = new Discord.MessageEmbed()
      .setTitle(
        `Случилась ошибка когда мы пытались очистить чат от мусора!\nВозможно этим сообщениям уже больше 2 недель?\nВ таком случае мы не сможем их удалить.`
      )
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    message.delete();
    message.channel
      .send({ embed: embed })
      .then((r) => r.delete({ timeout: 7000 }))
      .catch((err) => {
        console.error(err);
        message.channel.send(failembed);
      });
  },
};
