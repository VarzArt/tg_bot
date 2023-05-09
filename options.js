module.exports = {
  portfolioOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Виджет с погодой", callback_data: "weather" }],
        [{ text: "Виджет с обменником валют", callback_data: "exchanger" }],
        [{ text: "Проект личный дневник", callback_data: "diary" }],
        [{ text: 'Проект "Спутник Гуап"', callback_data: "guap" }],
      ],
    }),
  },
  againOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Выбрать другой проект", callback_data: "/again" }],
      ],
    }),
  },
};
