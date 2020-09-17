const { Client, RichEmbed } = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "Банит упомянутого пользователя.",
  execute(client, message, args) {
    if (
      message.member.hasPermission("BAN_MEMBERS") &&
      message.guild.me.hasPermission("BAN_MEMBERS")
    ) {
      const user = message.mentions.members.first();
      if (user.bannable) {
        message.react("744525650425282640");
        message.guild.members
          .ban(user.id, {
            reason:
              args.splice(1).join(" ") || "Модератор не указал причину бана",
          })
          .then((user) =>
            console.log(
              `Banned ${user.username || user.id || user} from ${message.guild}`
            )
          )
          .catch(console.error);
        const embed = new Discord.MessageEmbed()
          .setTitle(
            `Пользователь успешно забанен на сервере ${message.guild.name}`
          )
          .setColor(success)
          .setThumbnail("https://i.ibb.co/Q9Kxm9v/ban.gif")
          .setDescription(
            `• Дискорд тег: ${user.displayName}\n\n• Дискорд ID: ${user.id}\n\n• Упомянутый пользователь: <@${user.id}>`
          );
        message.channel.send(embed);
      } else if (!user.bannable) {
        message.react("✖");
        const embed = new Discord.MessageEmbed()
          .setTitle("Бан не удался!")
          .setColor(fail)
          .setThumbnail(
            "https://thumbs.gfycat.com/OldPalatableDugong-small.gif"
          )
          .setDescription(
            `Этот молот слишком тяжёлый, помогите поднять.\n (Не удалось забанить пользователя. Возможно он више ролью чем бот или Вы)`
          );
        message.channel.send(embed);
        message.delete();
      }
    }
  },
};
