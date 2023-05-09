const TelegramApi = require("node-telegram-bot-api");

const token = "6066273216:AAFat_aWf-REfDVGddbL3y3MR0PnB8HYVXc";

const bot = new TelegramApi(token, { polling: true });

const { portfolioOptions, againOptions } = require("./options");
const {
  weather_widjet,
  exchange_widjet,
  diary_project,
  guap_app,
} = require("./media");

const choise = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Ниже представлены несколько работ, которые, по моему скромному мнению, заслуживают твоего внимания)"
  );
  return bot.sendMessage(chatId, "Выбирай!", portfolioOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Получить информацию" },
    { command: "/portfolio", description: "Примеры работ" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://chpic.su/_data/stickers/h/HackerBoyStickers/HackerBoyStickers_015.webp"
      );
      return bot.sendMessage(
        chatId,
        "Добро пожаловать в телеграмм канал мини-портфолио!"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Приятно познакомиться, ${msg.from.first_name} ${msg.from.last_name}! Я создан для того, чтобы показать тебе некоторые примеры работ моего хозяина. Чтобы начать введи команду /portfolio или выберю ее в меню)`
      );
    }
    if (text === "/portfolio") {
      return choise(chatId);
    }

    return bot.sendMessage(chatId, "Я тебя не понимаю( Попробуй еще раз!");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      bot.sendMessage(chatId, "Выбирай!", portfolioOptions);
    }

    if (data === "weather") {
      bot.sendMediaGroup(chatId, weather_widjet);
      bot.sendMessage(
        chatId,
        `Полность можно посмотреть по ссылке на gitHub: https://github.com/VarzArt/RTG`,
        againOptions
      );
    }
    if (data === "exchanger") {
      bot.sendMediaGroup(chatId, exchange_widjet);
      bot.sendMessage(
        chatId,
        `Полность можно посмотреть по ссылке на gitHub: https://github.com/VarzArt/RTG`,
        againOptions
      );
    }
    if (data === "diary") {
      bot.sendMediaGroup(chatId, diary_project);
      bot.sendMessage(
        chatId,
        `Полность можно посмотреть по ссылке на gitHub: https://github.com/VarzArt/DIary`,
        againOptions
      );
    }
    if (data === "guap") {
      bot.sendMediaGroup(chatId, guap_app);
      bot.sendMessage(
        chatId,
        `К сожалению, в связи с проблемами с AppStore, приложение недоступно на данный момент, можно скачать только старую версию на андроид(`,
        againOptions
      );
    }
  });
};

start();
