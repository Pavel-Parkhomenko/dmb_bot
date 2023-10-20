import fs from 'fs'

export function read() {
  const fileContent = fs.readFileSync("bd.json", "utf8")
  return JSON.parse(fileContent)
}

export function write(content) {
  try {
    fs.writeFileSync("bd.json", JSON.stringify(content), 'utf8', err => {
      if(err) console.log(err)
    })
  } catch(err) {
    console.log(err)
  }
}

export function checkUsername(username) {
  const bd = read()

  for(let i = 0; i < bd.length; i++) {
    if(username === bd[i].username) {
      return true
    }
  }

  return false
}

// + one year
export function saveDateDmb(dateOut, username) {// /out YYYY-MM-DD
  const year = parseInt(dateOut.split('-')[0]) + 1
  const month = dateOut.split('-')[1]
  const day = dateOut.split('-')[2]

  const hasUser = checkUsername(username)
  console.log(hasUser)
  let bd = read()

  if(hasUser) {
    bd.map(user => {
      if(user.username === username) {
        user.dateDMB = 
          new Date(year + '-' + month + '-' + day).getTime().toString()
        user.dateOUT = new Date(dateOut).getTime().toString()
      }
    })
    write(bd)
  } else {
    const user = {
      username, 
      dateDMB: new Date(year + '-' + month + '-' + day).getTime().toString(),
      dateOUT: new Date(dateOut).getTime().toString()
    }
    bd = [... bd, user]
    write(bd)
  }

  console.log("aaa")
}

// сколько осталось в днях
export function getDaysDMB(username) { //YYYY-MM-DD
  const bd = read()

  for(let i = 0; i < bd.length; i++) {
    if(bd[i].username === username) {
      return (+bd[i].dateDMB - 
        bd[i].dateOUT) / (1000 * 60 * 60 * 24)
    }
  }
}

// сколько прошло
export function getDaysAfterOut(username) { //YYYY-MM-DD
  const bd = read()

  for(let i = 0; i < bd.length; i++) {
    if(bd[i].username === username) {
      const cntDays = parseInt((new Date().getTime() - +bd[i].dateOUT) / 
      (1000 * 60 * 60 * 24))
      return cntDays < 0 ? 0 : cntDays
    }
  }
}

// сколько осталось в днях
export function getDaysDate(dateOut) { //YYYY-MM-DD
  const dateDMB = getDateDembel(dateOut)
  return parseInt((new Date(dateDMB) - new Date(dateOut)) / 
    (1000 * 60 * 60 * 24))
}

export function setDateOutToBd(dateOut, botMessUsername) {
  const bdContent = read()

  for(let i = 0; i < bdContent.length; i++) {
    if(botMessUsername === bdContent[i].userName) {
      bdContent[i].dateOUT = new Date(dateOut).getTime().toString()
      break
    }
  }

  write(bdContent)
}

export function getInfo() {
  const bd = read()
  let res = ''
  bd.map(user => res += `${user.username}:
    осталось ${getDaysDMB(user.username)} дн.,
    прошло ${getDaysAfterOut(user.username)}\дн.\n`)
    
  return res
}