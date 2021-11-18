const fs = require('fs');
const makeId = require('../utils')


class Manager{
    async createEvent(event){
        try{
            let data = await fs.promises.readFile('./files/events.txt','utf-8')
            let events = JSON.parse(data);
            if(events.some(evt=>evt.title===event.title)){
                return {status:"error",message:"El evento ya existe"}
            }else{
                let dataObj = {
                    id:makeId(7),
                    title:event.title,
                    location:event.location,
                    price:event.price,
                    capacity:event.capacity,
                    status:"open",
                    participants:[]
                }
                events.push(dataObj);
                try{
                    await fs.promises.writeFile('./files/events.txt',
                    JSON.stringify(events,null,2));
                    return {status:"success",message:"Evento creado"}
                }catch(err){
                    return {status:"error", message:"No se pudo crear el evento"}
                }
            }
        }catch{
            let dataObj = {
                id:makeId(7),
                title:event.title,
                location:event.location,
                price:event.price,
                capacity:event.capacity,
                status:"open",
                participants:[]
            }
            try{
                await fs.promises.writeFile('./files/events.txt',JSON.stringify([dataObj],null,2))
                return {status:"success",message:"Evento creado con éxito"}
            }catch(error){
                return {status:"error",message:"No se pudo crear el evento: "+error}
            }
        }
    }
    async getById(id){
        try{
            let data =  await fs.promises.readFile('./files/events.txt','utf-8')
            let events = JSON.parse(data);
            let event = events.find(evt=>evt.id===id);
            if(event){
                return {status:"success",event:event}
            }else{
                return {status:"error",event:null,message:"Evento no encontrado"}
            }
        }catch(err){
            return {status:"error",message:"No se encontró el evento"}
        }
    }
    async registerUser(user){
        try{
            let data = await fs.promises.readFile('./files/users.txt','utf-8');
            let users = JSON.parse(data);
            let dataUser ={
                name:user.name,
                last_name:user.last_name,
                age:user.age,
                events:[]
            }
            dataUser = Object.assign({id:makeId(5)},dataUser);
            users.push(dataUser);
            await fs.promises.writeFile('./files/users.txt',JSON.stringify(users,null,2));
            return {status:"success",message:"Usuario agregado con éxito"}
        }catch(err){
            let dataUser ={
                name:user.name,
                last_name:user.last_name,
                age:user.age,
                events:[]
            }
            dataUser = Object.assign({id:makeId(5)},dataUser);
            await fs.promises.writeFile('./files/users.txt',JSON.stringify([dataUser],null,2));
            return {status:"success",message:"Usuario agregado con éxito"}
        }
    }
    async registerToEvent(id,eventId){
        try{
            let eventsData = await fs.promises.readFile('./files/events.txt','utf-8');
            let usersData = await fs.promises.readFile('./files/users.txt','utf-8');
            let events = JSON.parse(eventsData);
            let users = JSON.parse(usersData);
            if (users.length===0||!users.some(user=>user.id===id)) return {status:"error",message:"Usuario no encontrado"}
            if (events.length===0||!events.some(event=>event.id===eventId)) return {status:"error",message:"Evento no encontrado"}
            let eventObj = events.find(event=>event.id===eventId);
            let userObj = users.find(user=>user.id===id);
            if(eventObj.status==="open"){
                eventObj.participants.push(userObj.id);
                eventObj.capacity--;
                if(eventObj.capacity===0){
                    eventObj.status="closed";
                }
                userObj.events.push(eventObj.id);
            }else{
                return {status:"error",message:"El evento está cerrado, no se pueden agregar más usuarios"}
            }
            await fs.promises.writeFile('./files/events.txt',JSON.stringify(events,null,2));
            await fs.promises.writeFile('./files/users.txt',JSON.stringify(users,null,2));
            return {status:"success",message:"El usuario se ha registrado con éxito"}
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = Manager;