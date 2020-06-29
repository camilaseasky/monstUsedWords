const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..','legendas')

const simbols = [
  '.','?','-','"','♪','_','<i>','</i>','\r','[',']','(',')', ','
]





fn.readFilesOnFolder(caminho)
        .then(fn.filterFileExt('.srt'))
        .then(fn.readFiles)
        .then(fn.joinContents) //juntando os arquivos separados por linhas
        .then(fn.splitByCaracter('\n')) //separando em linhas
        .then(fn.removeBlancks)
        .then(fn.removeWithCaracter('-->'))
        .then(fn.removeOnlyNumber)
        .then(fn.removeSimbols(simbols))
        .then(fn.joinContents)
        .then(fn.splitByCaracter(' '))
        .then(fn.removeBlancks)
        .then(fn.groupWords)
        .then(fn.orderByPropertyNumber('qtde', 'desc'))
        .then(fn.createResultFileJSON)
        

