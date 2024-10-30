var categoriasModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var categoriasSchema = new Schema({
    codigo: String,
    nombre: String,
    imagen:String,
    descripcion:String
})

const Mymodel = mongoose.model("categorias", categoriasSchema)

categoriasModel.registrar = function(payload, callback){

    const instacia = new Mymodel
    instacia.codigo = payload.codigo
    instacia.nombre = payload.nombre
    instacia.imagen = "http://localhost:3000/imagenes/default.png"
    instacia.descripcion = payload.descripcion

    instacia.save().then((respuesta)=>{
        return callback({state:true, mensaje:"Producto Almacenado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

categoriasModel.listar = function(payload, callback){
    
    Mymodel.find({}, {}).then((respuesta)=>{
        return callback ({state:true, datos:respuesta})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

categoriasModel.actualizar = function(payload, callback){
    Mymodel.findOneAndUpdate({codigo:payload.codigo}, 
        {nombre:payload.nombre,
        descripcion:payload.descripcion,
        imagen:payload.imagen
                    
        }).then((respuesta)=>{
            console.log(respuesta)
            return callback ({state:true, mensaje: "Producto actualizado correctamente"})
        }).catch((error)=>{
            return callback({state:false, mensaje: error})
        })
}

categoriasModel.buscarporcodigo = function(payload, callback){

    Mymodel.find({codigo:payload.codigo}, {}).then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

categoriasModel.borrar = function(payload, callback){
    Mymodel.findOneAndDelete({codigo:payload.codigo}, {}).then((respuesta)=>{
        console.log(respuesta)
        return callback ({state:true, mensaje: "Producto eliminado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: "Error al eliminar producto " + error})
    })
}


module.exports.categoriasModel = categoriasModel