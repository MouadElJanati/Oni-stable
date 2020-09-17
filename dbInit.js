const Sequelize = require("sequelize");
const chalk = require("chalk");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "./database/shopdatabase.sqlite",
});

const CurrencyShop = require("./models/CurrencyShop")(
  sequelize,
  Sequelize.DataTypes
);
require("./models/Users")(sequelize, Sequelize.DataTypes);
require("./models/UserItems")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    const shop = [
      CurrencyShop.upsert({ name: "🍵Чай", cost: 1 }),
      CurrencyShop.upsert({ name: "☕Кофе", cost: 2 }),
      CurrencyShop.upsert({ name: "🍰Тортик", cost: 5 }),
    ];
    await Promise.all(shop);
    console.log(chalk.cyan("❖ [INFO] База данных синхронизирована"));
    sequelize.close();
  })
  .catch(console.error);
