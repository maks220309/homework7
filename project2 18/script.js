const fs = require('fs')
const express = require('express')
const path = require('path')
const ejs = require('ejs')
let names = ['Игорь','Михаил','Максим','Валера','Стас','Клим','Вова','Игнат','Дима','Рома']
let countries = ['Беларусь', 'Россия','Литва','Латвия','Польша','Украина','Германия','Франция',' Италия','Испания']
let users = []
const server = express()
const PORT = 3000
const createPath = (page) => path.resolve(__dirname,'pages-ejs',  `${page}.ejs`)
server.listen(PORT, (error) => {
   error ? console.log(error) : console.log(`listening port ${PORT}`)
})
server.get('/', (req, res) => {
   res.render(createPath('index'))
})
server.use(express.static('./pages-ejs/styles'))
server.get('/list', (req, res) => {
    for (let i = 0; i<30;i++ ){
        users.push({"name": `"${names[Math.floor(Math.random()*(9-0)+0)]}"`,"age": `"${Math.floor(Math.random()*(100-1)+1)}"`,"country": `"${countries[Math.floor(Math.random()*(9-0)+0)]}"`})
    }
    fs.writeFileSync('./data.json', JSON.stringify(users), (error) => {
        error ? console.log(error) : null
    });
    fs.readFile('data.json', (err, data)=>{
        data = JSON.parse(data)
        res.render(createPath('list'), { data })
    })
})