var productosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var productosSchema = new Schema({
    codigo: String,
    nombre: String,
    marca: String,
    referencia: String,
    imagen:String,
    descripcion:String
})

const Mymodel = mongoose.model("productos", productosSchema)

productosModel.registrar = function(payload, callback){

    const instacia = new Mymodel
    instacia.codigo = payload.codigo
    instacia.nombre = payload.nombre
    instacia.marca = payload.marca
    instacia.referencia = payload.referencia
    instacia.imagen = "http://localhost:3000/imagenes/default.png"
    instacia.descripcion = payload.descripcion

    instacia.save().then((respuesta)=>{
        return callback({state:true, mensaje:"Producto Almacenado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

productosModel.listar = function(payload, callback){
    
    Mymodel.find({}, {}).then((respuesta)=>{
        return callback ({state:true, datos:respuesta})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

productosModel.actualizar = function(payload, callback){
    Mymodel.findOneAndUpdate({codigo:payload.codigo}, 
        {nombre:payload.nombre,
        marca:payload.marca,
        referencia:payload.referencia,
        descripcion:payload.descripcion,
        imagen:payload.imagen
                    
        }).then((respuesta)=>{
            console.log(respuesta)
            return callback ({state:true, mensaje: "Producto actualizado correctamente"})
        }).catch((error)=>{
            return callback({state:false, mensaje: error})
        })
}

productosModel.buscarporcodigo = function(payload, callback){

    Mymodel.find({codigo:payload.codigo}, {}).then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

productosModel.borrar = function(payload, callback){
    Mymodel.findOneAndDelete({codigo:payload.codigo}, {}).then((respuesta)=>{
        console.log(respuesta)
        return callback ({state:true, mensaje: "Producto eliminado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: "Error al eliminar producto " + error})
    })
}


module.exports.productosModel = productosModel