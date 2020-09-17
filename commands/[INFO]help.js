const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const { prefix, token } = require("../assets/config.json");

module.exports = {
  name: "help",
  description: "Справка с командами бота.",
  execute(client, message, args) {
    message.react("744234265910312961");
    let embed = new Discord.MessageEmbed()
      .setTitle("Список модулей Oni🍂")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .addField(
        "◤🎭◢   ⌑≫⋉Взаимодействия⋊≪⌑",
        "• Команды для взаимодействия с другим человеком.\n\n"
      )
      .addField("◤🖼◢   ⌑≫⋉Арты⋊≪⌑", "• Команды для поиска артов.\n\n")
      .addField("◤🎈◢   ⌑≫⋉Развлечения⋊≪⌑", "• Команды для развлечений.\n\n")
      .addField(
        "◤ℹ◢   ⌑≫⋉Информация⋊≪⌑",
        "• Команды для получения информации о боте.\n\n"
      )
      .addField(
        "◤🛡◢   ⌑≫⋉Модерация⋊≪⌑",
        "• Команды для удобного модерирования сервером.\n\n"
      )
      .addField(
        "◤🎶◢   ⌑≫⋉Музыка⋊≪⌑",
        "• Команды для воспроизведения музыки.\n\n"
      )
      .addField(
        "◤🍂◢   ⌑≫⋉Для владельца⋊≪⌑",
        "• Команды для владельца бота.\n\n"
      )
      .addField("◤🛠◢   ⌑≫⋉Утилиты⋊≪⌑", "• Команды для владельца бота.\n\n")
      .addField(
        "\n\n◤❔◢   ⌑≫⋉Дополнительная информация⋊≪⌑",
        "❯ Подробную информацию о командах и боте Вы можете узнать на [Нашем официальном сайте](https://tflashgamer.github.io/oni.html)"
      )
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png");
    message.channel.send(embed);
  },
};
