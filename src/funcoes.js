const fs = require('fs')
const path = require('path')

  function readFilesOnFolder(caminho) {
     return new Promise((resolve, reject) => {
      try {
        resolve(fs.readdirSync(caminho).map(file => path.join(caminho,file))
        )
      }
      catch(err) {
        reject(err)
      }
    }) 
  }

  function filterFileExt(extensao) {
    return function(files) {
      return files.filter(file => file.endsWith(extensao))
    }
  }

  function readFileContent(caminho) {
    return new Promise((resolve, reject) => {
     try {
          const content = fs.readFileSync(caminho, { encoding: 'utf-8'})
          resolve(content.toString())
     }
     catch(err) {
       reject(err)
     }
   }) 
 }

   
  function readFiles(files) {
    return Promise.all(files.map(file => readFileContent(file)))
  }

  function removeBlancks(contents) {
    return contents.filter(el => el.trim())
  }

  function removeWithCaracter(caracter) {
    return function(contents) {
      return contents.filter(el => !el.includes(caracter))
    }
    
  }

  function removeOnlyNumber(contents) {
    return contents.filter(el => {
      const num = parseInt(el.trim())
      return num !== num
    })
  }

  function removeSimbols(simbols) {
    return function(contents){
      return contents.map( el => {
        return simbols.reduce((text, simbol) => {
          return text.split(simbol).join('')
        }, el)
      })
    }
  }

  function joinContents(contents)  {
      return contents.join(' ')
  }
      

  function splitByCaracter(caracter) {
    return function(content) {
      return content.split(caracter)
    } 
  }

  function groupWords(words) {
    return Object.values(words.reduce((group, word) => 
    {
      const w = word.toLowerCase()
      const qtde = group[w] ? group[w].qtde + 1 : 1
      group[w] = { elemento: w, qtde}
      return group
    }, {}))
     
 }

 function orderByPropertyNumber(attr, ordem= 'asc') {
  return function(content) {
    const desc = (o1, o2) => o2[attr] - o1[attr]
    const asc = (o1, o2) => o1[attr] - o2[attr]
    return content.sort(ordem === 'asc' ? asc : desc)
  }
}

function createResultFileJSON(resultado) {
  const caminho = path.join(__dirname, '..','legendas','mostUserWords.json')
  return new Promise((resolve, reject) => {
    try {
          
          resolve(fs.writeFileSync(caminho, JSON.stringify(resultado)))
    }
    catch(err) {
      reject(err)
    }
  }) 
  
}

 

  module.exports = {
    readFiles,
    readFilesOnFolder,
    filterFileExt,
    readFileContent,
    removeBlancks,
    removeWithCaracter,
    removeOnlyNumber,
    removeSimbols,
    joinContents,
    splitByCaracter,
    groupWords,
    orderByPropertyNumber,
    createResultFileJSON
  }

  


