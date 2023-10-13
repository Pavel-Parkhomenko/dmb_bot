import fs from 'fs'
import { ONE_YEAR_MSC } from './constants.js'

export function read() {
  const fileContent = fs.readFileSync("bd.json", "utf8")
  return JSON.parse(fileContent)
}

export function write(content) {
  fs.writeFileSync("bd.json", JSON.stringify(content))
}

export function checkUsername(mess) {
  const botMessUsername = mess.from.username

  const bdContent = read()

  for(let i = 0; i < bdContent.length; i++) {
    if(botMessUsername === bdContent[i].userName) {
      return true
    }
  }

  const newBdContent = [...bdContent, {
    userName: botMessUsername,
    dateOUT: null,
  }]

  write(newBdContent)

  return false
}

// + one year
export function getDateDembel(dateOut) {
  const date = dateOut.split(' ')[1]
  const year = parseInt(date.split('.')[2]) + 1
  const month = date.split('.')[1]
  const day = date.split('.')[0]

  return year + '-' + month + '-' + day
}

// сколько служишь в днях
export function getDaysAfterOut(dateOut) { //YYYY-MM-DD
  return (Date.now() - new Date(dateOut)) / (1000 * 60 * 60 * 24)
}

// сколько осталось в днях
export function getDaysBeforeDMB(dateDMB, dateOut) { //YYYY-MM-DD
  return (new Date(dateDMB) - new Date(dateOut)) / (1000 * 60 * 60 * 24)
}