var carouselModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var carouselSchema = new Schema({
    codigo:String,
    titulo: String,
    descripcion:String,
    imagen:String
})

const Mymodel = mongoose.model("carousel", carouselSchema)

carouselModel.registrar = function(payload, callback){

    const instacia = new Mymodel
    instacia.codigo = payload.codigo
    instacia.titulo = payload.titulo
    instacia.imagen = "http://localhost:3000/imagenes/default.png"
    instacia.descripcion = payload.descripcion

    instacia.save().then((respuesta)=>{
        return callback({state:true, mensaje:"Producto Almacenado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

carouselModel.listar = function(payload, callback){
    
    Mymodel.find({}, {}).then((respuesta)=>{
        return callback ({state:true, datos:respuesta})
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

carouselModel.actualizar = function(payload, callback){
    Mymodel.findOneAndUpdate({codigo:payload.codigo}, 
        {codigo:payload.codigo,
        titulo:payload.titulo,
        descripcion:payload.descripcion,
        imagen:payload.imagen
                    
        }).then((respuesta)=>{
            console.log(respuesta)
            return callback ({state:true, mensaje: "Producto actualizado correctamente"})
        }).catch((error)=>{
            return callback({state:false, mensaje: error})
        })
}

carouselModel.buscarporcodigo = function(payload, callback){

    Mymodel.find({codigo:payload.codigo}, {}).then((respuesta)=>{
        return callback (respuesta)
    }).catch((error)=>{
        return callback({state:false, mensaje: error})
    })
}

carouselModel.borrar = function(payload, callback){
    Mymodel.findOneAndDelete({codigo:payload.codigo}, {}).then((respuesta)=>{
        console.log(respuesta)
        return callback ({state:true, mensaje: "Elemento eliminado correctamente"})
    }).catch((error)=>{
        return callback({state:false, mensaje: "Error al eliminar elemento " + error})
    })
}


carouselModel.cambiarImagen = function(payload, callback){
    Mymodel.findOneAndUpdate({codigo:payload.codigo}, 
        {
        imagen:payload.imagen      
        }).then((respuesta)=>{
            console.log(respuesta)
            return callback ({state:true, mensaje: "Imagen actualizada correctamente"})
        }).catch((error)=>{
            return callback({state:false, mensaje: error})
        })
}







module.exports.carouselModel = carouselModel