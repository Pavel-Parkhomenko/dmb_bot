import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'
import { COMMANDS } from './commands.js'
import {
 checkUsername, getInfo, saveDateDmb,
 getDaysDMB, getDaysAfterOut
} from './helpers.js'

config()

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true
  }
})

bot.setMyCommands(COMMANDS)

bot.on("polling_error", err => console.error("polling_error"))

bot.onText(/\/start/, async msg => {
  try {
    await bot.sendMessage(msg.chat.id, `Вы запустили Dembel бота!`)
  }
  catch(error) {
    console.log(error)
  }
})

bot.onText(/\/menu/, async msg => {
  await bot.sendMessage(msg.chat.id, `Меню бота`, {
    reply_markup: {
      keyboard: [
        ['* Изм. дату', '* Инфа'],
        ['* До дмб', '* Прошло дней'],//before DMB
        ['* Закрыть меню']
      ],
      resize_keyboard: true
    }
  })
})

bot.onText('* Закрыть меню', async msg => {
  await bot.sendMessage(msg.chat.id, 'Меню закрыто', {
    reply_markup: {
      remove_keyboard: true
    }
  })
})

bot.on('text', async msg => {
  if(msg.text.indexOf('/out') !== -1) {
    saveDateDmb(msg.text.split(' ')[1], msg.from.username)
  } 
  else if(msg.text == '* До дмб') {
    if(!checkUsername(msg.from.username)){
      await bot.sendMessage(msg.chat.id, 'Добавьте дату отправки')
      return
    }
    await bot.sendMessage(msg.chat.id, 'Дo дмб ' + getDaysDMB(msg.from.username))
  }
  else if(msg.text == '* Прошло дней') {
    if(!checkUsername(msg.from.username)){
      await bot.sendMessage(msg.chat.id, 'Добавьте дату отправки')
      return
    }
    await bot.sendMessage(msg.chat.id, 'Прошло дней ' + getDaysAfterOut(msg.from.username))
  }
  else if(msg.text === '* Изм. дату') {
    await bot.sendMessage(msg.chat.id, 'Введите дату призыва /out YYYY-MM-DD')
  } 
  else if (msg.text === '* Инфа') {
    await bot.sendMessage(msg.chat.id, getInfo())
  }
})
