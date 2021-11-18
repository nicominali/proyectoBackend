const { query } = require('express');
const express = require('express');
const Manager = require('./clases/Manager');

const app = express();
const PORT = process.env.PORT||8080;

const manager = new Manager()

const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en "+PORT)
})
app.get('/',(req,res)=>{
    res.send('Hola mundo');
})
app.get('/eventos',(req,res)=>{
    const status = req.query.status;
    manager.getAllEvents().then(result=>{
        if(result.status==="success"){
           let eventos = result.payload;
           let eventosFiltradors = eventos.filter(evento=>evento.status===status)
           if(eventosFiltradors.length>0){
               res.send(eventosFiltradors);
           }else{
               res.status(404).send('No hay eventos disponibles');
           }
        }else{
            res.status(500).send(result.message);
        }   
    })
})

app.get('/users', async (req,res)=>{
    let usuarios = await manager.getAllUsers()
    res.send(usuarios)
})

app.get('/users/:uid',(req,res)=>{
    const userId = req.params.uid;
    manager.getUserById(userId).then(result=>{
        res.send(result);
    })
})