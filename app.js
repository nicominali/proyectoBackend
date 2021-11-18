const express = require('express');
const moment = require('moment')

const app = express()

const PORT = process.env.PORT||8080;
 
let contador = 0;
 
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})

server.on('error',(error)=>console.log('error en el servirdor: '+error))

app.get('/',(req,res)=>{
    res.send('<h1 style="text-aling:center">Opgram</h1>')
})
app.get('/visitas',(req,res)=>{
    contador++;
    console.log((`visistaste la pagina ${contador}veces`))
})
app.get('/fhy',(req,res)=>{
    let fecha_y_hora = moment().format('DD/M//YYYY hh:mm:ss');
    res.send({fyh:fecha_y_hora});
})
app.get('/productos',(req,res)=>{
    let producto = 1
})

const Manager = require('./clases/Manager');

const manager = new Manager();

manager.createEvent({title:'partido', location:'Qatar', price:'85550', capacity:755}).then(result=>{console.log(result.message);
})