import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'
import { COMMANDS } from './commands.js'
import {
 getDateDembel, getDaysAfterOut, getDaysBeforeDMB,
 checkUsername
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

bot.on('text', async msg => {
  if(msg.text.indexOf('/out') !== -1) {
    console.log(msg.text)
  } 
  else if(msg.text == 'dd') {
    console.log(msg)
  }
})

bot.onText(/\/start/, async msg => {
  try {
    await bot.sendMessage(msg.chat.id, `Вы запустили Dembel бота!`)
    checkUsername(msg) || await bot.sendMessage(msg.chat.id, 'Добавьте дату призыва')
  }
  catch(error) {
    console.log(error)
  }
})

bot.onText(/\/info/, async msg => {
  try {
    await bot.sendMessage(msg.chat.id, 'info aaa')
  }
  catch(error) {
    console.log(error)
  }
})

bot.onText(/\/menu/, async msg => {
  await bot.sendMessage(msg.chat.id, `Меню бота`, {
    reply_markup: {
      keyboard: [
        ['Дата Ухода'],
        ['dd'],
        ['Закрыть Меню']
      ],
      resize_keyboard: true
    }
  })
})

bot.onText('Закрыть меню', async msg => {
  await bot.sendMessage(msg.chat.id, 'Меню закрыто', {
    reply_markup: {
      remove_keyboard: true
    }
  })
})

bot.onText('Дата Ухода', async msg => {
  await bot.sendMessage(msg.chat.id, 'Введите дату ухода в армию. /out YYYY-MM-DD')
})

bot.onText('dd', async msg => {
  // await bot.sendMessage(msg.chat.id, 'Твой дембель через ' + getDaysBeforeDMB() + 'дней')
  console.log(msg)
})