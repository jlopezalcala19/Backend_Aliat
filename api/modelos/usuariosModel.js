var usuariosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
    email: String,
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: Number,
    password: String,
    estado:Number,
    rol: String
})

const Mymodel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.registrar = function(payload, callback){

    const instacia = new Mymodel
    instacia.email = payload.email
    instacia.nombre = payload.nombre
    instacia.apellido = payload.apellido
    instacia.direccion = payload.direccion
    instacia.telefono = payload.telefono
    instacia.password = payload.password
    instacia.estado =0
    instacia.rol = "1" // 1 cliente, 2 administrador

    instacia.save().then((respuesta)=>{
        return callback({state:true, mensaje:"Usuario Almacenado correctamente"})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false, mensaje: error})
    })
}

usuariosModel.listar = function(payload, callback){
    
    Mymodel.find({}, {password:0}).then((respuesta)=>{
        return callback ({state:true, datos:respuesta})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

usuariosModel.actualizar = function(payload, callback){
    Mymodel.findOneAndUpdate({email:payload.email}, 
        {nombre:payload.nombre,
        apellido:payload.apellido,
        telefono:payload.telefono,
        direccion:payload.direccion,
        password:payload.password,
        rol:payload.rol
        }).then((respuesta)=>{
            //console.log(respuesta)
            return callback ({state:true, mensaje: "Usuario actualizado correctamente"})
        }).catch((error)=>{
            return callback({state:false, mensaje: error})
        })
}

usuariosModel.actualizarpassword = function(payload, callback){
    Mymodel.findOneAndUpdate({email:payload.email}, 
        {
            password:payload.nuevopassword

        }).then((respuesta)=>{
            console.log(respuesta)
            return callback ({state:true, mensaje: "Contraseña actualizada correctamente"})
        }).catch((error)=>{
            return callback({state:false, mensaje: error})
        })

}

usuariosModel.buscarporemail = function(payload, callback){

    Mymodel.find({email:payload.email}, {}).then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

usuariosModel.filtrarporemail = function(payload, callback){
    Mymodel.find({email:payload.email}, {}).then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

usuariosModel.borrar = function(payload, callback){
    Mymodel.findOneAndDelete({email:payload.email}, {}).then((respuesta)=>{
        //console.log(respuesta)
        return callback ({state:true, mensaje: "Usuario eliminado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: "Error al eliminar producto " + error})
    })
}

usuariosModel.login = function(payload, callback){
    Mymodel.find({email:payload.email, password:payload.password}, {}).then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}


module.exports.usuariosModel = usuariosModel