const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const { prefix, token } = require("../assets/config.json");

module.exports = {
  name: "help",
  description: "Справка с командами бота.",
  async execute(client, message, args) {
    message.react("744234265910312961");
    message.delete({ timeout: 3000 });
    const receivedEmbed = message.embeds[0];
    let embed = new Discord.MessageEmbed(receivedEmbed)
      .setTitle("Список модулей Oni🍂")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .addField(
        "◤🎭◢   ⌑≫⋉Взаимодействия⋊≪⌑",
        "• Команды для взаимодействия с другим человеком.\n\n"
      )
      .addField(
        "◤🖼◢   ⌑≫⋉Арты и пикчи⋊≪⌑",
        "• Команды для поиска артов и картинок.\n\n"
      )
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

    let smugembed = new Discord.MessageEmbed()
      .setTitle("◤🎭◢   ⌑≫⋉Взаимодействия⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}smug`, `Самодовольно улыбнуться`, true);

    let artsembed = new Discord.MessageEmbed()
      .setTitle("◤🖼◢   ⌑≫⋉Арты и пикчи⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}nekogif`, `Гифка с неко.`, true)
      .addField(`❯ ${prefix}neko`, `Арт с неко.`, true)
      .addField(`❯ ${prefix}kemonomimi`, `Арт с кемономими.`, true)
      .addField(`❯ ${prefix}meow`, `Пикча с котиками :3.`, true)
      .addField(`❯ ${prefix}foxgirl`, `Арт с инумими.`, true);

    let funembed = new Discord.MessageEmbed()
      .setTitle("◤🎈◢   ⌑≫⋉Развлечения⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}iq`, `Игра, у кого больше IQ.`, true);

    let infoembed = new Discord.MessageEmbed()
      .setTitle("◤ℹ◢   ⌑≫⋉Информация⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}stats`, `Статистика бота.`, true)
      .addField(`❯ ${prefix}ping`, `Пинг вашего сервера и бота.`, true)
      .addField(`❯ ${prefix}help`, `Справка о командах бота.`, true)
      .addField(
        `❯ ${prefix}invite`,
        `Инвайт ссылка для добавления бота.`,
        true
      );

    let moderembed = new Discord.MessageEmbed()
      .setTitle("◤🛡◢   ⌑≫⋉Модерация⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(
        `❯ ${prefix}addemote`,
        `Добавление любого эмодзи на севрер.`,
        true
      )
      .addField(`❯ ${prefix}ban`, `Команда для бана нарушителей.`, true)
      .addField(`❯ ${prefix}prune`, `Очистка чата.`, true)
      .addField(`❯ ${prefix}unban`, `Команда для разбана пользователя.`, true);

    let musicembed = new Discord.MessageEmbed()
      .setTitle("◤🎶◢   ⌑≫⋉Музыка⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}loop`, `Включает режим повтора для музыки.`, true)
      .addField(`❯ ${prefix}lyrics`, `Позволяет достать слова песни.`, true)
      .addField(`❯ ${prefix}np`, `Статистика об треке.`, true)
      .addField(`❯ ${prefix}play`, `Воспроизвести музыку.`, true)
      .addField(
        `❯ ${prefix}pruning`,
        `Включить режим очистки сообщений за собой.`,
        true
      )
      .addField(
        `❯ ${prefix}queue`,
        `Список треков ожидающих воспроизведения.`,
        true
      )
      .addField(
        `❯ ${prefix}remove`,
        `Убрать трек из списка воспроизведения.`,
        true
      )
      .addField(`❯ ${prefix}resume`, `Снять паузу с плеера.`, true)
      .addField(`❯ ${prefix}search`, `Поиск треков по названию.`, true)
      .addField(
        `❯ ${prefix}shuffle`,
        `Перемешать треки в списке ожидания.`,
        true
      )
      .addField(
        `❯ ${prefix}skipto`,
        `Скипнуть треки к определённому месту в списке.`,
        true
      )
      .addField(`❯ ${prefix}stop`, `Остановить плеер.`, true)
      .addField(`❯ ${prefix}volume`, `Изменить громкость плеера.`, true)
      .addField(`❯ ${prefix}playlist`, `Запустить плейлист с ютюба.`, true)
      .addField(`❯ ${prefix}skip`, `Пропустить трек.`, true)
      .addField(`❯ ${prefix}pause`, `Поставить музыку на паузу.`, true);

    let ownerembed = new Discord.MessageEmbed()
      .setTitle("◤🍂◢   ⌑≫⋉Для владельца⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}reboot`, `Перезапустить бота.`, true)
      .addField(`❯ ${prefix}setname`, `Установить ник боту.`, true)
      .addField(`❯ ${prefix}shutdown`, `Отключить бота.`, true);

    let utilsembed = new Discord.MessageEmbed()
      .setTitle("◤🛠◢   ⌑≫⋉Утилиты⋊≪⌑")
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png")
      .addField(`❯ ${prefix}afk`, `Дайте другим узнать что Вы отошли.`)
      .addField(
        `❯ ${prefix}avatar`,
        `Достать аватарку пользователя в полном размере.`
      )
      .addField(`❯ ${prefix}profile`, `Достать профиль пользователя.`, true)
      .addField(`❯ ${prefix}say`, `Сказать от имени бота.`, true)
      .addField(`❯ ${prefix}serverinfo`, `Достать информацию о сервере.`, true)
      .addField(
        `❯ ${prefix}userinfo`,
        `Достать информацию о пользователе.`,
        true
      )
      .addField(`❯ ${prefix}vote`, `Запустить голосование.`, true)
      .addField(`❯ ${prefix}embed`, `Отослать сообщение через эмбед.`, true);
    let mainhelpmessage = await message.channel.send(embed);
    await mainhelpmessage.react("🎭");
    await mainhelpmessage.react("🖼");
    await mainhelpmessage.react("🎈");
    await mainhelpmessage.react("ℹ");
    await mainhelpmessage.react("🛡");
    await mainhelpmessage.react("🎶");
    await mainhelpmessage.react("🍂");
    await mainhelpmessage.react("🛠");

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = mainhelpmessage.createReactionCollector(filter, {
      time: 180000,
    });

    collector.on("collect", async (reaction, user) => {
      switch (reaction.emoji.name) {
        case "🎭":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(smugembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "⏪":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(embed);
          mainhelpmessage.react("🎭");
          mainhelpmessage.react("🖼");
          mainhelpmessage.react("🎈");
          mainhelpmessage.react("ℹ");
          mainhelpmessage.react("🛡");
          mainhelpmessage.react("🎶");
          mainhelpmessage.react("🍂");
          mainhelpmessage.react("🛠");
          break;
      }
      switch (reaction.emoji.name) {
        case "🖼":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(artsembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "🎈":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(funembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "ℹ":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(infoembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "🛡":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(moderembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "🎶":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(musicembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "🍂":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(ownerembed);

          mainhelpmessage.react("⏪");
          break;
      }
      switch (reaction.emoji.name) {
        case "🛠":
          reaction.users.remove(user).catch(console.error);
          await mainhelpmessage.reactions.removeAll().catch(console.error);
          await mainhelpmessage.edit(utilsembed);

          mainhelpmessage.react("⏪");
          break;
      }
    });
    collector.on("end", () => {
      mainhelpmessage.reactions.removeAll().catch(console.error);
    });
  },
};
