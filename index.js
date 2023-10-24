const TgApi = require("node-telegram-bot-api");

const { gameOptions, againOptions } = require('./options')

const token = "6829956301:AAFHXCN-obxwzvexk9BX8fvl9diggrsocWc";

const bot = new TgApi(token, { polling: true });

const chats = {};



const startGame = async(chatId) => {
    await bot.sendMessage(
        chatId,
        'Отгадаешь цифру от 0 до 9?'
      );
      const randomNumber = Math.floor(Math.random() * 10)
      chats[chatId] = randomNumber;
      await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Получить информацию о пользователе" },
    { command: "/game", description: "Угадай цифру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/0e3/ae9/0e3ae9e2-4ae0-4e0e-a790-0d30793c403e/96/15.webp"
      );
      return bot.sendMessage(chatId, "Добро пожаловать в чат, мазафака");
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Это ты, мазафака ${msg.from.first_name} ${msg.from.username}?`
      );
    }

    if (text === "Как дела?") {
        return bot.sendMessage(
          chatId,
          'Нормалёк, живём по тихоньку'
        );
      }

    if (text === "/game") {
        return startGame(chatId);
      }

    return bot.sendMessage(chatId, 'Чё ты хочешь от меня, чёрт?')
  });

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
        return startGame(chatId);
    }

    if (data === chats[chatId]) {
        return bot.sendMessage(chatId, `Красава, ты отгадал цифру ${chats[chatId]}`, againOptions);
    } else {
        return bot.sendMessage(chatId, `Не получилось, не фартануло. Цифра была ${chats[chatId]}`, againOptions)
    }
    
  })
};

start();

// {
//     message_id: 1,
//     from: {
//       id: 881017327,
//       is_bot: false,
//       first_name: 'N',
//       username: 'Who6_9',
//       language_code: 'en'
//     },
//     chat: {
//       id: 881017327,
//       first_name: 'N',
//       username: 'Who6_9',
//       type: 'private'
//     },
//     date: 1698184931,
//     text: '/start',
//     entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
//   }
