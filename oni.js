/**
 *
 * Инициализация API для бота
 *
 *
 **/
const fs = require("fs");
const { prefix, token, botversion } = require("./assets/config.json");
const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const Keyv = require("keyv");
const config = require("./assets/config.json");
const prefixes = new Keyv("sqlite://database/prefixdatabase.sqlite");
const globalPrefix = config.prefix;
const client = new Discord.Client();
const { version } = require("discord.js");
const package = require("./package.json");
const { success, fail } = require("./assets/colors.json");
const CHANNEL = config.logchannel;
const chalk = require("chalk");
const moment = require("moment");
require("moment-duration-format");
moment.locale("ru");
const Canvas = require("canvas");
const { Op } = require("sequelize");
client.commands = new Discord.Collection();

/**
 *
 * Логирование для бота
 *
 *
 **/
const keyv = new Keyv();
keyv.on("error", (err) => console.log("Connection Error", err));
console.log(chalk.hex(`#715e79`)(`❖ Запускаем бота`));
console.log(chalk.hex(`#715e79`)(`\n\n••• ━───── • • ─────━ •••`));
console.log(chalk.hex(`#715e79`)`    
    ██████████████████████████████████████      
  ██▒▒██    ▒▒██  ██    ░░██▓▓██    ▒▒██▓▓██
 ██▒▒  ▒▒██▒▒██    ░░██░░██▓▓  ▒▒██▒▒██▓▓  ▓▓██  
██▒▒  ░░  ▒▒██        ░░██▓▓      ▒▒██▓▓  ▒▒  ▓▓██        .--.        _ 
██████████████████████████████████████████████████       : ,. :      :_;
██▒▒▒▒▒▒▒▒▒▒██        ░░██▓▓▓▓▓▓▓▓▒▒██▓▓▓▓▓▓▓▓▓▓██       : :: :,-.,-..-.
  ██▒▒  ░░▒▒██        ░░██▓▓      ▒▒██▓▓  ▒▒▓▓██         : :; :: ,. :: :
    ██▒▒  ░░▒▒██      ░░██▓▓    ▒▒██▓▓  ▒▒▓▓██            .__.':_;:_;:_;
      ██▒▒  ▒▒██      ░░██▓▓    ▒▒██▓▓  ▓▓██      
        ██▒▒  ▒▒██    ░░██▓▓  ▒▒██▓▓  ▓▓██        
          ██▒▒▒▒██    ░░██▓▓  ▒▒██▓▓▓▓██         
            ██▒▒▒▒██  ░░██▓▓▒▒██▓▓▓▓██            
              ██▒▒██  ░░██▓▓▒▒██▓▓██             
                ██▒▒██░░██▓▓██▓▓██                
                  ████░░██▓▓████                  
                    ██░░██▓▓██                    
                      ██████ 
                        `);
console.log(chalk.hex(`#715e79`)(`••• ━───── • • ─────━ •••`));
console.log(
  chalk.hex(`#715e79`)(`┏                Базовая информация                ┓`)
);
console.log(
  chalk.hex(`#715e79`)(`\n	Версия бота: v `) + chalk.bgHex(`#715e79`)(botversion)
);
console.log(
  chalk.hex(`#715e79`)(`        Версия discord.js: `) +
    chalk.bgHex(`#715e79`)(version)
);
console.log(
  chalk.hex(`#715e79`)(`        Версия Node.js: `) +
    chalk.bgHex(`#715e79`)(process.version)
);
console.log(
  chalk.hex(`#715e79`)(`	Рекомендованый хостинг: `) +
    chalk.bgHex(`#715e79`)(`Heroku`)
);
console.log(chalk.hex(`#715e79`)(`	Хорошего дня!`));
console.log(
  chalk.hex(`#715e79`)(`┗                                                  ┛`)
);
console.log(
  chalk.hex(`#715e79`)(
    `—————————Ѽ—————————\n❖ Логирование включено\n—————————Ѽ—————————`
  )
);
client.once("ready", () => {
  console.log(
    `❖`,
    chalk.bgHex(`#715e79`)(`[LOGIN]`),
    chalk.hex(`#715e79`)(
      `:oni.js ✔ \n—————————Ѽ—————————\n(Теперь Вы можете использовать бота)\n—————————Ѽ—————————`
    )
  );
});

// Бот готов
client.on("ready", () => {
  client.user.setPresence({
    activity: { name: `${prefix}help | 🍂` },
    status: "dnd",
  });
});

/**
 *
 * Распаковка команд из папки commands
 *
 *
 **/
const commandFiles = fs.readdirSync("./commands");
let jsfiles = commandFiles.filter((f) => f.split(".").pop() === "js");
if (jsfiles.length <= 0)
  return console.log(
    chalk.red(
      `❖`,
      chalk.bgRed(`[ERROR]`),
      `: ❌ Ваша папка с командами пуста...`
    )
  );
console.log(
  `❖`,
  chalk.bgHex(`#715e79`)(`[INFO]`),
  `: После загрузки команд дождитесь оповещение о том что бот залогинился!`
);
console.log(
  `❖`,
  chalk.bgHex(`#715e79`)(`[INFO]`),
  `: Загружаю ${jsfiles.length} команд...`
);
jsfiles.forEach((f, i) => {
  let props = require(`./commands/${f}`);
  console.log(
    `❖`,
    chalk.bgGreen(`[LOADING]`),
    `${i + 1}: ${f}`,
    chalk.green(`✔`)
  );

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
});
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(client, message, args);
  } catch (error) {
    console.error(error);
    const errorembed = new Discord.MessageEmbed()
      .setTitle("Ошибка при распаковке команды!")
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
      .setDescription(`Описание ошибки: ${error}`);
    message.reply(errorembed);
  }
});

/**
 *
 * afk
 *
 *
 **/
client.afk = new Map();

/**
 *
 * Магазин
 *
 *
 **/
const { Users, CurrencyShop } = require("./dbObjects");
const currency = new Discord.Collection();
Reflect.defineProperty(currency, "add", {
  value: async function add(id, amount) {
    const user = currency.get(id);
    if (user) {
      user.balance += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, balance: amount });
    currency.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(currency, "getBalance", {
  value: function getBalance(id) {
    const user = currency.get(id);
    return user ? user.balance : 0;
  },
});

client.once("ready", async () => {
  const storedBalances = await Users.findAll();
  storedBalances.forEach((b) => currency.set(b.user_id, b));
  console.log(`❖`, chalk.bgCyan(`[SYNC]`), `БД Магазина синхронизирована`);
});

client.on("message", async (message) => {
  const oni = client.emojis.cache.get("744234265910312961");
  if (message.author.bot) return;
  currency.add(message.author.id, 1);

  if (!message.content.startsWith(prefix)) return;
  const input = message.content.slice(prefix.length).trim();
  if (!input.length) return;
  const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

  if (command === "balance") {
    const target = message.mentions.users.first() || message.author;
    const balanceembed = new Discord.MessageEmbed()
      .setTitle(`Баланс пользователя ${target.username}`)
      .setDescription(
        `У пользователя на балансе ${currency.getBalance(target.id)}${oni}`
      )
      .setThumbnail("https://i.gifer.com/NpXy.gif")
      .setColor(success);
    return message.channel.send(balanceembed);
  } else if (command === "inventory") {
    const target = message.mentions.users.first() || message.author;
    const user = await Users.findOne({ where: { user_id: target.id } });
    const items = await user.getItems();
    const itemsnone = new Discord.MessageEmbed()
      .setTitle(`Инвентарь пользователя ${target.username}`)
      .setDescription(`Пустовато тут у вас . -.\n Может что то прикупить? 🤔`)
      .setThumbnail(
        "https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
      )
      .setColor(fail);
    if (!items.length) return message.channel.send(itemsnone);
    const item = new Discord.MessageEmbed()
      .setTitle(`Инвентарь пользователя ${target.username}`)
      .setDescription(
        `${items.map((t) => `${t.amount} ${t.item.name}`).join(";\n ")}`
      )
      .setThumbnail(
        "https://i.pinimg.com/originals/84/ef/44/84ef447b1462d8ed463d868d017ea365.gif"
      )
      .setColor(success);
    return message.channel.send(item);
  } else if (command === "transfer") {
    const transfersuccess = new Discord.MessageEmbed()
      .setTitle(`Передача валюты`)
      .setDescription(
        `Валюта успешно передана ${transferAmount}${oni} пользователю ${
          transferTarget.tag
        }. Ваш баланс сейчас ${currency.getBalance(message.author.id)}${oni}`
      )
      .setThumbnail(
        "https://i.pinimg.com/originals/a7/df/56/a7df56bd45fa03724f0261cc04133ad6.gif"
      )
      .setColor(success);
    const transferfailvalue = new Discord.MessageEmbed()
      .setTitle(`Передача валюты`)
      .setDescription(`Извините ${message.author}, это недопустимое количество`)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
      .setColor(fail);
    const transfernotenought = new Discord.MessageEmbed()
      .setTitle(`Передача валюты`)
      .setDescription(`Извините ${message.author} у Вас недостаточно ${oni}.`)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
      .setColor(fail);
    const transfernotzero = new Discord.MessageEmbed()
      .setTitle(`Передача валюты`)
      .setDescription(
        `Пожалуйста, введите количетсво больше чем 0, ${message.author}`
      )
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
      .setColor(fail);
    const currentAmount = currency.getBalance(message.author.id);
    const transferAmount = commandArgs
      .split(/ +/)
      .find((arg) => !/<@!?\d+>/.test(arg));
    const transferTarget = message.mentions.users.first();

    if (!transferAmount || isNaN(transferAmount))
      return message.channel.send(transferfailvalue);
    if (transferAmount > currentAmount)
      return message.channel.send(transfernotenought);
    if (transferAmount <= 0) return message.channel.send(transfernotzero);

    currency.add(message.author.id, -transferAmount);
    currency.add(transferTarget.id, transferAmount);

    return message.channel.send(transfersuccess);
  } else if (command === "buy") {
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: commandArgs } },
    });
    const buynotfound = new Discord.MessageEmbed()
      .setTitle(`Покупка в магазине`)
      .setDescription(`Этой вещи нету в магазине.`)
      .setThumbnail(
        "https://i.pinimg.com/originals/a7/df/56/a7df56bd45fa03724f0261cc04133ad6.gif"
      )
      .setColor(fail);
    const buynotenought = new Discord.MessageEmbed()
      .setTitle(`Покупка в магазине`)
      .setDescription(`У Вас недостаточно валюты${oni}, ${message.author}`)
      .setThumbnail(
        "https://i.pinimg.com/originals/a7/df/56/a7df56bd45fa03724f0261cc04133ad6.gif"
      )
      .setColor(fail);
    const buysuccess = new Discord.MessageEmbed()
      .setTitle(`Покупка в магазине`)
      .setDescription(`Вы купили ${item.name}`)
      .setThumbnail(
        "https://i.pinimg.com/originals/23/d9/19/23d919e9ccf98579cc8de129e5a1bb6c.gif"
      )
      .setColor(success);
    if (!item) return message.channel.send(buynotfound);
    if (item.cost > currency.getBalance(message.author.id)) {
      return message.channel.send(buynotenought);
    }

    const user = await Users.findOne({ where: { user_id: message.author.id } });
    currency.add(message.author.id, -item.cost);
    await user.addItem(item);

    message.channel.send(buysuccess);
  } else if (command === "shop") {
    const items = await CurrencyShop.findAll();
    const shopitems = new Discord.MessageEmbed()
      .setTitle(`Магазин`)
      .setDescription(
        items
          .map((i, position) => `${position + 1}: ${i.name}: ${i.cost}${oni}`)
          .join("\n"),
        { code: true }
      )
      .setThumbnail(
        "https://i.pinimg.com/originals/84/ef/44/84ef447b1462d8ed463d868d017ea365.gif"
      )
      .setColor(success);

    return message.channel.send(shopitems);
  } else if (command === "leaderboard") {
    const leaderboarditems = new Discord.MessageEmbed()
      .setTitle(`Лидирующие по количеству валюты`)
      .setDescription(
        currency
          .sort((a, b) => b.balance - a.balance)
          .filter((user) => client.users.cache.has(user.user_id))
          .first(10)
          .map(
            (user, position) =>
              `${position + 1}: ${client.users.cache.get(user.user_id).tag}: ${
                user.balance
              }${oni}`
          )
          .join("\n"),
        { code: true }
      )
      .setThumbnail("https://i.gifer.com/NpXy.gif")
      .setColor(success);
    return message.channel.send(leaderboarditems);
  }
});

/**
 *
 * Изменение префикса
 *
 *
 **/

client.on("message", async (message) => {
  if (message.author.bot) return;

  let args;
  if (message.guild) {
    let prefix;

    if (message.content.startsWith(globalPrefix)) {
      prefix = globalPrefix;
    } else {
      const guildPrefix = await prefixes.get(message.guild.id);
      if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    if (!prefix) return;
    args = message.content.slice(prefix.length).trim().split(/\s+/);
  } else {
    const slice = message.content.startsWith(globalPrefix)
      ? globalPrefix.length
      : 0;
    args = message.content.slice(slice).split(/\s+/);
  }

  const command = args.shift().toLowerCase();

  if (command === "prefix") {
    if (args.length) {
      const prefixchange = new Discord.MessageEmbed()
        .setTitle(`Изменение префикса`)
        .setDescription(
          `Префикс для этого сервера успешно изменён на \`${args[0]}\``
        )
        .setThumbnail(
          "https://media.giphy.com/media/U5U2nP0dlMkljrQA6R/giphy.gif"
        )
        .setColor(success);
      await prefixes.set(message.guild.id, args[0]);

      return message.channel.send(prefixchange);
    }
    const prefixnow = new Discord.MessageEmbed()
      .setDescription(
        `Мой префикс на этом сервере \`${
          (await prefixes.get(message.guild.id)) || globalPrefix
        }\``
      )
      .setThumbnail(
        "https://media.giphy.com/media/U5U2nP0dlMkljrQA6R/giphy.gif"
      )
      .setColor(success);
    return message.channel.send(prefixnow);
  }
});

/**
 *
 * Canvas приветствие
 *
 *
 **/
const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 70;

  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "новенькие◤💎◢"
  );
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");
  const canvass = require("./assets/canvas.json");
  const background = await Canvas.loadImage(
    canvass.images[Math.floor(Math.random() * canvass.images.length)]
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "Добро пожаловать на сервер,",
    canvas.width / 2.5,
    canvas.height / 3.5
  );

  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName}!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `
    ${
      canvass.joinphrases[
        Math.floor(Math.random() * canvass.joinphrases.length)
      ]
    }`,
    canvas.width / 2.7,
    canvas.height / 1.4
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  channel.send(`Добро пожаловать на сервер, ${member}!`, attachment);
});
try {
  client.on("message", (message) => {
    if (message.content === "*jointest") {
      client.emit("guildMemberAdd", message.member);
    }
  });
} catch (err) {
  console.error(err);
}

/**
 *
 * Логирование событий в Discord
 *
 *
 **/

//bot disconnected from Discord
client.on("disconnected", function () {
  console.log(
    chalk.red("[ERROR]"),
    "Потеряно соединение с Discord API. Я попробую переподключится..."
  );
});

//warning from Discord.js
client.on("warn", function (msg) {
  console.log(chalk.yellow("[WARN]"), +msg);
});

//error from Discord.js
client.on("error", function (err) {
  console.log(chalk.red("[DISCORD ERROR]") + err.message);
  process.exit(1);
});

//message received
client.on("message", function (message) {
  if (message.author.id != client.user.id) {
    if (message.channel.type == "text")
      console.log(
        "[" + message.guild.name + "][#" + message.channel.name + "]",
        chalk.bgYellow(chalk.black("[MSG]")) +
          " " +
          message.author.username +
          "#" +
          message.author.discriminator +
          ": " +
          formatConsoleMessage(message)
      );
  }
});

//message deleted
client.on("messageDelete", function (message) {
  if (message.channel.type == "text") {
    //log to console
    console.log(
      "[" +
        message.guild.name +
        "][#" +
        message.channel.name +
        "]" +
        " " +
        chalk.bgYellow(chalk.black("[MSGDEL]")) +
        " " +
        message.author.username +
        "#" +
        message.author.discriminator +
        ": " +
        formatConsoleMessage(message)
    );

    //post in the guild's log channel
    let deletemessage = new Discord.MessageEmbed()
      .setTitle("**[Сообщение удалено]**" + " " + moment().format("LLLL"))
      .addField(
        `❯ Информация об отправителе`,
        `• Пользователь: ${message.author.tag}\n• ID Пользователя: ${message.author.id}\n`,
        true
      )
      .addField(
        `❯ Информация об сообщении`,
        `• ID сообщения: ${message.id}\n• Контент сообщения: ${message.cleanContent}`,
        true
      )
      .setColor(success)
      .setThumbnail(
        message.author.avatarURL({ format: "png", dynamic: true, size: 2048 })
      );
    var log = message.guild.channels.cache.find(
      (channel) => channel.id === CHANNEL
    );
    if (message.author.bot) return;
    if (message.content.includes(prefix)) return;
    if (log != null) log.send(deletemessage);
  }
});

//message update

client.on("messageUpdate", function (oldMessage, newMessage) {
  if (
    newMessage.channel.type == "text" &&
    newMessage.cleanContent != oldMessage.cleanContent
  ) {
    //log to console
    console.log(
      "[" +
        newMessage.guild.name +
        "][#" +
        newMessage.channel.name +
        "]" +
        " " +
        chalk.bgYellow(chalk.black("[MSGUPD]")) +
        newMessage.author.username +
        "#" +
        newMessage.author.discriminator +
        ":\n\tOLDMSG: " +
        formatConsoleMessage(oldMessage) +
        "\n\tNEWMSG: " +
        formatConsoleMessage(newMessage)
    );

    //post in the guild's log channel
    let updatemessage = new Discord.MessageEmbed()
      .setTitle("**[Сообщение изменено]**" + " " + moment().format("LLLL"))
      .addField(
        `❯ Информация об отправителе`,
        `• Пользователь: ${newMessage.author.username} \n• ID Пользователя: ${newMessage.author.id}\n`,
        true
      )
      .addField(
        `❯ Информация об сообщении`,
        `• **Старое сообщение**: ${oldMessage.cleanContent}\n
         • **Новое сообщение**: ${newMessage.cleanContent}`,
        true
      )
      .setColor(success)
      .setThumbnail(
        newMessage.author.avatarURL({
          format: "png",
          dynamic: true,
          size: 2048,
        })
      );
    var log = newMessage.guild.channels.cache.find(
      (channel) => channel.id === CHANNEL
    );
    if (log != null) log.send(updatemessage);
  }
});

//user has been banned
client.on("guildBanAdd", function (guild, user) {
  let banmessage = new Discord.MessageEmbed()
    .setTitle("**[Пользователь забанен]**")
    .addField(
      `❯ Информация об бане`,
      `\n• Пользователь: ${user.tag}\n
      • ID: ${user.id}\n
      • Время бана: ${moment().format("LLLL")}`,
      true
    )
    .setColor(success)
    .setThumbnail(
      user.avatarURL({
        format: "png",
        dynamic: true,
        size: 2048,
      })
    );
  //log to console
  console.log(
    "[" +
      guild.name +
      "]" +
      " " +
      chalk.bgRed("[BAN]") +
      user.username +
      "#" +
      user.discriminator
  );

  //post in the guild's log channel
  var log = guild.channels.cache.find((channel) => channel.id === CHANNEL);
  if (log != null) log.send(banmessage);
});

//user has been unbanned
client.on("guildBanRemove", function (guild, user) {
  let unbanmessage = new Discord.MessageEmbed()
    .setTitle("**[Пользователь разбанен]**")
    .addField(
      `❯ Информация об пользователе`,
      `\n• Пользователь: ${user.tag}\n
      • ID: ${user.id}\n
      • Время разбана: ${moment().format("LLLL")}`,
      true
    )
    .setColor(success)
    .setThumbnail(
      user.avatarURL({
        format: "png",
        dynamic: true,
        size: 2048,
      })
    );
  //log to console
  console.log(
    "[" +
      guild.name +
      "]" +
      " " +
      chalk.bgCyan("[UNBAN]") +
      user.username +
      "#" +
      user.discriminator
  );

  //post in the guild's log channel
  var log = guild.channels.cache.find((channel) => channel.id === CHANNEL);
  if (log != null) log.send(unbanmessage);
});

//user has joined a guild
client.on("guildMemberAdd", async (member) => {
  const guild = await member.guild;
  let joinmessage = await new Discord.MessageEmbed()
    .setTitle("**[Пользователь присоеденился к серверу]**")
    .addField(
      `❯ Информация об пользователе`,
      `\n• Пользователь: ${member}\n
      • На сервере: ${guild.name}\n
      • Время присоединения: ${moment().format("LLLL")}`,
      true
    )
    .setColor(success)
    .setThumbnail("https://i.gifer.com/P6yH.gif");
  //log to console
  await console.log(
    "[" +
      guild.name +
      "]" +
      " " +
      chalk.bgYellow(chalk.black("[JOIN]")) +
      member
  );

  //post in the guild's log channel
  const channelss = client.channels.cache.get(CHANNEL);
  {
    await channelss.send(joinmessage);
  }
});

//user has joined a guild
client.on("guildMemberRemove", async (member) => {
  const guild = await member.guild;
  let leftmessage = new Discord.MessageEmbed()
    .setTitle("**[Пользователь покинул сервер]**")
    .addField(
      `❯ Информация об пользователе`,
      `\n• Пользователь: ${member}\n
      • На сервере: ${guild.name}\n
      • Когда ушёл из сервера: ${moment().format("LLLL")}`,
      true
    )
    .setColor(success)
    .setThumbnail("https://i.gifer.com/P6yH.gif");
  //log to console
  console.log(
    "[" +
      guild.name +
      "]" +
      " " +
      chalk.bgYellow(chalk.black("[LEAVE]")) +
      member
  );

  //post in the guild's log channel
  const channelss = client.channels.cache.get(CHANNEL);
  {
    channelss.send(leftmessage);
  }
});

function formatConsoleMessage(message) {
  return message.cleanContent.replace(new RegExp("\n", "g"), "\n\t");
}

/**
 *
 * Музыкальная часть
 *
 *
 **/

client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
});
/**
 *
 * Подключение к Discord API
 *
 *
 **/

client.login(token);
