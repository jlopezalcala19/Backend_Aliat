var categoriasController = {}
var categoriasModel = require("../modelos/categoriasModel.js").categoriasModel

categoriasController.registrar = function(request, response){
    var datos ={
        codigo: request.body.codigo,
        nombre: request.body.nombre,
        descripcion: request.body.descripcion,
        imagen: request.body.imagen
    }
    
    if(datos.codigo == undefined || datos.codigo == "" || datos.codigo == null){
        response.json({state:false, mensaje: "El codigo es obligatorio"})
        return false
    }
    
    if(datos.nombre == undefined || datos.nombre == "" || datos.nombre == null){
        response.json({state:false, mensaje: "El nombre es obligatorio"})
        return false
    }


    if(datos.descripcion == undefined || datos.descripcion == "" || datos.descripcion == null){
        response.json({state:false, mensaje: "La descripción es obligatoria"})
        return false
    }
    

    if(datos.nombre.length < 4){
        response.json({state:false, mensaje: "El nombre no puede ser inferior a 4 caracteres"})
        return false
    }

    if(datos.descripcion.length < 10){
        response.json({state:false, mensaje: "La descripción del producto debe ser mayor"})
        return false
    }

    if(datos.nombre.length > 50){
        response.json({state:false, mensaje: "El nombre no puede ser superior a 15 caracteres"})
        return false
    }
    
    
    var texto = datos.nombre.toLowerCase()
    var autorizada = "áéíóú - / abcdefghijklmnñopqrstuvwxyz0123456789"
    
    var listasoportada = function(autorizada, texto){
        for(let a = 0; a<texto.length; a++){
            var r = autorizada.indexOf(texto[a])
            if(r == -1){
                return false
            }else{
                if(a == texto.length - 1){
                    return true
                }
            }
        }
    } 
    
    if(listasoportada(autorizada, texto)==false){
        response.json({state: false, mensaje: "Caracter invalido"})
        return false
    }

    categoriasModel.buscarporcodigo(datos, function(existe){
    console.log(existe.length)
        if (existe.length == 0){
            categoriasModel.registrar(datos, function(respuesta){
            response.json(respuesta)
        })}else{
            response.json({state: false, mensaje: "Producto existente, por favor revise el codigo ingresado"})
            return false
        }
    })
}

categoriasController.listar = function(request, response){
    categoriasModel.listar (null, function(respuesta){
        response.json(respuesta)
    })
}

categoriasController.actualizar = function(request, response){
    var datos ={
        codigo:request.body.codigo,
        nombre: request.body.nombre,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen
    }

    if(datos.nombre == undefined || datos.nombre == "" || datos.nombre == null){
        response.json({state:false, mensaje: "El nombre es obligatorio"})
        return false
    }

    if(datos.descripcion == undefined || datos.descripcion == "" || datos.descripcion == null){
        response.json({state:false, mensaje: "La descripcion es obligatoria"})
        return false
    }

    categoriasModel.buscarporcodigo(datos, function(posicion){
    if (posicion.length == 0){
        response.json({state:false, mensaje: "Producto no encontrado"})
        return false
        }else{
        categoriasModel.actualizar(datos, function(respuesta){
        response.json(respuesta)
    })

   }

    })
}

categoriasController.borrar = function(request, response){
    var datos ={
        codigo: request.body.codigo
    }

    categoriasModel.borrar(datos, function(respuesta){
        response.json(respuesta)
        return false
    })
}

categoriasController.buscarporcodigo = function(request, response){
    var datos ={
        codigo: request.body.codigo
    }

    categoriasModel.buscarporcodigo(datos, function(filtro){
        if (filtro == "" || filtro == undefined || filtro == null){
            response.json({state:false, mensaje: "Producto no encontrado"})
            return false
        }else{    
            response.json(filtro)
        }
    })
    
}


module.exports.categoriasController = categoriasController