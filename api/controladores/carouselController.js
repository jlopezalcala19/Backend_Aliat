var carouselController = {}
var carouselModel = require("../modelos/carouselModel.js").carouselModel

carouselController.registrar = function(request, response){
    var datos ={
        codigo: request.body.codigo,
        titulo: request.body.titulo,
        descripcion: request.body.descripcion,
        imagen: request.body.imagen
    }
    
    if(datos.titulo == undefined || datos.titulo == "" || datos.titulo == null){
        response.json({state:false, mensaje: "El titulo es obligatorio"})
        return false
    }
    

    if(datos.descripcion == undefined || datos.descripcion == "" || datos.descripcion == null){
        response.json({state:false, mensaje: "La descripción es obligatoria"})
        return false
    }
    

    carouselModel.buscarporcodigo(datos, function(existe){
    console.log(existe.length)
        if (existe.length == 0){
            carouselModel.registrar(datos, function(respuesta){
            response.json(respuesta)
        })}else{
            response.json({state: false, mensaje: "El elemento ya existe"})
            return false
        }
    })
}

carouselController.listar = function(request, response){
    carouselModel.listar (null, function(respuesta){
        response.json(respuesta)
    })
}

carouselController.actualizar = function(request, response){
    var datos ={
        codigo:request.body.codigo,
        titulo: request.body.titulo,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen
    }

    if(datos.titulo == undefined || datos.titulo == "" || datos.titulo == null){
        response.json({state:false, mensaje: "El titulo es obligatorio"})
        return false
    }

    if(datos.descripcion == undefined || datos.descripcion == "" || datos.descripcion == null){
        response.json({state:false, mensaje: "La descripcion es obligatoria"})
        return false
    }

    carouselModel.buscarporcodigo(datos, function(posicion){
        if (posicion.length == 0){
            response.json({state:false, mensaje: "Elemento no encontrado"})
            return false
            }else{
            carouselModel.actualizar(datos, function(respuesta){
            response.json(respuesta)
        })
    
       }
    
    })
}

carouselController.borrar = function(request, response){
    var datos ={
        codigo: request.body.codigo
    }

    carouselModel.borrar(datos, function(respuesta){
        response.json(respuesta)
        return false
    })
}

carouselController.buscarporcodigo = function(request, response){
    var datos ={
        codigo: request.body.codigo
    }

    carouselModel.buscarporcodigo(datos, function(filtro){
        if (filtro == "" || filtro == undefined || filtro == null){
            response.json({state:false, mensaje: "Elemento no encontrado"})
            return false
        }else{    
            response.json(filtro)
        }
    })
    
}


carouselController.cambiarImagen = function(request, response){
    var datos ={
        codigo:request.body.codigo
    } 

    console.log(datos.codigo)
    
    carouselModel.buscarporcodigo(datos, function(posicion){
        if (posicion.length == 0){
            response.json({state:false, mensaje: "Elemento no encontrado"})
            return false
            }else{
                carouselModel.cambiarImagen(datos, function(respuesta){
             response.json(respuesta)
        })
    
       }
    
    })
}












module.exports.carouselController = carouselController