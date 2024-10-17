const TelegramApi = require('node-telegram-bot-api')

const token = '7790973516:AAF2JyS40542GG2ut90HtYFqhZSI68yNwoM'

const bot = new TelegramApi(token, {polling: true})

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Пивка?', callback_data: 'beer'}, {text: 'Не пивка?', callback_data: 'not_beer'}]
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Узнать кто ты'}
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/2af/6db/2af6dbf1-4758-4b9a-8bd5-8f9d49af90f6/5.webp')
            return bot.sendMessage(chatId, 'Здорово, бандит!')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Ты ${msg.from.first_name} ${msg.from.last_name}`)
        }
        return bot.sendMessage(chatId, 'Не понял тебя, чего хотел?', options)
    })

    bot.on('callback_query', msg => {
        console.log(msg)
    })
}

start()