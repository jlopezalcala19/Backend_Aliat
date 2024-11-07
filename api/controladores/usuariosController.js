
var usuariosController = {}
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel

usuariosController.registrar = function(request, response){
    var datos ={
        _id:request.body._id,
        email: request.body.email,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        password: request.body.password,
        rol: request.body.rol
    }
    
    if(datos.email == undefined || datos.email == "" || datos.email == null){
        response.json({state:false, mensaje: "El email es obligatorio"})
        return false
    }
    
    if(datos.nombre == undefined || datos.nombre == "" || datos.nombre == null){
        response.json({state:false, mensaje: "El nombre es obligatorio"})
        return false
    }
    
    if(datos.apellido == undefined || datos.apellido == "" || datos.apellido == null){
        response.json({state:false, mensaje: "El apellido es obligatorio"})
        return false
    }

    if(datos.direccion == undefined || datos.direccion == "" || datos.direccion == null){
        response.json({state:false, mensaje: "La dirección es obligatoria"})
        return false
    }

    if(datos.telefono == undefined || datos.telefono == "" || datos.telefono == null){
        response.json({state:false, mensaje: "El Telefono es obligatorio"})
        return false
    }

    if(datos.password == undefined || datos.password == "" || datos.password == null){
        response.json({state:false, mensaje: "La contraseña es obligatoria"})
        return false
    }

    if(datos.nombre.length < 4){
        response.json({state:false, mensaje: "El nombre no puede ser inferior a 4 caracteres"})
        return false
    }
    
    if(datos.nombre.length > 15){
        response.json({state:false, mensaje: "El nombre no puede ser superior a 15 caracteres"})
        return false
    }
    
    
    var texto = datos.nombre.toLowerCase()
    var autorizada = "abcdefghijklmnñopqrstuvwxyz0123456789"
    
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
        response.json({state: true, mensaje: "Caracter invalido"})
        return false
    }

    usuariosModel.buscarporemail(datos, function(existe){
    console.log(existe.length)
        if (existe.length == 0){
            usuariosModel.registrar(datos, function(respuesta){
            response.json(respuesta)
        })}else{
            response.json({state: false, mensaje: "Usuario existente, por favor revise el email ingresado"})
            return false
        }
    })
}

usuariosController.listar = function(request, response){
    usuariosModel.listar (null, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.actualizar = function(request, response){
    var datos ={
        email:request.body.email,
        nombre: request.body.nombre,
        apellido:request.body.apellido,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        rol:request.body.rol
    }

    if(datos.email == undefined || datos.email == "" || datos.email == null){
        response.json({state:false, mensaje: "El email es obligatorio"})
        return false
    }

    if(datos.nombre == undefined || datos.nombre == "" || datos.nombre == null){
        response.json({state:false, mensaje: "El nombre es obligatorio"})
        return false
    }

    if(datos.apellido == undefined || datos.apellido == "" || datos.apellido == null){
        response.json({state:false, mensaje: "El apellido es obligatorio"})
        return false
    }

    if(datos.direccion == undefined || datos.direccion == "" || datos.direccion == null){
        response.json({state:false, mensaje: "La dirección es obligatoria"})
        return false
    }

    if(datos.telefono == undefined || datos.telefono == "" || datos.telefono == null){
        response.json({state:false, mensaje: "El telefono es obligatorio"})
        return false
    }


    usuariosModel.buscarporemail(datos, function(posicion){
    if (posicion.length == 0){
        response.json({state:false, mensaje: "Usuario no encontrado"})
        return false
        }else{
        usuariosModel.actualizar(datos, function(respuesta){
        response.json(respuesta)
    })

   }

    })
}

usuariosController.actualizarperfil = function(request, response){
    var datos ={
        email:request.body.email,
        nombre: request.body.nombre,
        apellido:request.body.apellido,
        direccion:request.body.direccion,
        telefono:request.body.telefono
    }

    usuariosModel.buscarporemail(datos, function(posicion){
    if (posicion.length == 0){
        response.json({state:false, mensaje: "Usuario no encontrado"})
        return false
        }else{
        usuariosModel.actualizar(datos, function(respuesta){
        request.session.email=pos[0].email
        response.json(respuesta)
    })

   }

    })
}

usuariosController.actualizarpassword = function(request, response){
    var datos ={
        password:request.body.password,
        email:request.body.email,
        nuevopassword:request.body.nuevopassword
    }

    if(datos.password == undefined || datos.password == "" || datos.password == null){
        response.json({state:false, mensaje: "La contraseña es obligatoria"})
        return false
    }

    if(datos.nuevopassword == undefined || datos.nuevopassword == "" || datos.nuevopassword == null){
        response.json({state:false, mensaje: "La nueva contraseña es obligatoria"})
        return false
    }

    usuariosModel.actualizarpassword(datos, function(respuesta){
    response.json(respuesta)
    })

}

usuariosController.borrar = function(request, response){
    var datos ={
        email: request.body.email
    }

    if(datos.email == undefined || datos.email == "" || datos.email == null){
        response.json({state:false, mensaje: "El email es obligatorio"})
        return false
    }

    usuariosModel.borrar(datos, function(respuesta){
        response.json(respuesta)
        return false
    })
}

usuariosController.filtrarporemail = function(request, response){
    var datos ={
        email: request.body.email
    }

    if(datos.email == undefined || datos.email == "" || datos.email == null){
        response.json({state:false, mensaje: "Ingrese email para realizar la busqueda"})
        return false
    }

    usuariosModel.filtrarporemail(datos, function(filtro){
        if (filtro == "" || filtro == undefined || filtro == null){
            response.json({state:false, mensaje: "Email no encontrado"})
            return false
        }else{    
            response.json(filtro)
        }
    })
    
}

usuariosController.login = function(request, response){
    var datos = {
        email: request.body.email,
        password: request.body.password
    }

    if (datos.email == undefined || datos.email==null || datos.email == ""){
        response.json({state:false, mensaje: "El email es obligatorio"})
        return false
    }

    if (datos.password == undefined || datos.password==null || datos.password == ""){
        response.json({state:false, mensaje: "El campo password es obligatorio"})
        return false
    }

    usuariosModel.login(datos,function(pos){
        if(pos.length==0){
            response.json({state:false, mensaje: "Credenciales invalidas"})
        }else{
            console.log(pos)
            request.session.email=pos[0].email
            request.session.nombre=pos[0].nombre
            request.session.apellido=pos[0].apellido
            request.session.telefono=pos[0].telefono
            request.session.direccion=pos[0].direccion
            request.session.password=pos[0].password
            request.session.rol=pos[0].rol
            request.session.nombrecompleto=pos[0].nombre + ' ' + pos[0].apellido

            response.json({state:true, mensaje: "Bienvenido", datos:pos})
        }
    })

}



module.exports.usuariosController = usuariosController
