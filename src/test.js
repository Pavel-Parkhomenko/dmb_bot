const bd = [{"username":"Pavel","dateOUT":"1696032000000"},{"username":"Stats","dateOUT":"1695600000000"},{"username":"pasha_235","dateOUT":"1695600000000","dateDMB":"1727654400000"}]
function getDaysDMB() { //YYYY-MM-DD
    // const bd = read()
    const username = "pasha_235"
  
    for(let i = 0; i < bd.length; i++) {
      if(bd[i].username === username) {

        console.log((new Date(+bd[i].dateDMB) - new Date(+bd[i].dateOUT)) / (1000 * 60 * 60 * 24))
        // console.log(new Date(+bd[i].dateOUT))

        return (+bd[i].dateDMB - +bd[i].dateOUT) / (1000 * 60 * 60 * 24)
      }
    }
  }

  console.log(getDaysDMB())