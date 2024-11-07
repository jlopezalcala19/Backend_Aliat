
//*********************************************USUARIOS*************************************************************************** */

const sharp = require("sharp")

var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

app.post("/usuarios/registrar", function(request, response){
    usuariosController.registrar(request, response)    
})

app.post("/usuarios/listar", function(request, response){
    usuariosController.listar(request, response)
})

app.post("/usuarios/actualizar", function(request, response){
    usuariosController.actualizar(request, response)
})

app.post("/usuarios/actualizarperfil", function(request, response){
    usuariosController.actualizarperfil(request, response)
})

app.post("/usuarios/actualizarpassword", function(request, response){
    usuariosController.actualizarpassword(request, response)
})

app.post("/usuarios/borrar", function(request, response){
    usuariosController.borrar(request, response)
})

app.post("/usuarios/buscar", function(request, response){
    usuariosController.filtrarporemail(request, response)
})

app.post("/usuarios/login", function(request, response){
    usuariosController.login(request, response)
})

app.post("/usuarios/state", function(request, response){
    response.json(request.session)
    console.log(request.session)
})

app.post("/usuarios/logout", function(request, response){
    request.session.destroy()
    response.json({state:true, mensaje:"Sesión Cerrada"})
})


//***********************************************PRODUCTOS************************************************************************* */
var obligalogin = function(request, response, next){
    if(request.session.rol ==undefined){
        response.json({state:false, mensaje:"Debe iniciar Sesión"})
    }else{
        return next()
    }
}

var soloadmin = function(request,response,next){

    if(request.session.rol !=2){
        response.json({state:false, mensaje:"No tiene permisos de administrador"})
    }else{
        return next()
    }
}

var productosController = require("./api/controladores/productosController.js").productosController

app.post("/productos/registrar", obligalogin, soloadmin, function(request, response){
    productosController.registrar(request, response)    
})

app.post("/productos/listar", function(request, response){
    productosController.listar(request, response)
})

app.post("/productos/actualizar", obligalogin, soloadmin, function(request, response){
    productosController.actualizar(request, response)
})

app.post("/productos/borrar", obligalogin, soloadmin, function(request, response){
    productosController.borrar(request, response)
})

app.post("/productos/buscarporcodigo", obligalogin, soloadmin, function(request, response){
    productosController.buscarporcodigo(request, response)
})


//*****************************************************CATEGORIAS******************************************************************* */

var obligalogin = function(request, response, next){
    if(request.session.rol ==undefined){
        response.json({state:false, mensaje:"Debe iniciar Sesión"})
    }else{
        return next()
    }
}

var soloadmin = function(request,response,next){

    if(request.session.rol !=2){
        response.json({state:false, mensaje:"No tiene permisos de administrador"})
    }else{
        return next()
    }
}

var categoriasController = require("./api/controladores/categoriasController.js").categoriasController

app.post("/categorias/registrar", obligalogin, soloadmin, function(request, response){
    categoriasController.registrar(request, response)    
})

app.post("/categorias/listar", obligalogin, soloadmin, function(request, response){
    categoriasController.listar(request, response)
})

app.post("/categorias/actualizar", obligalogin, soloadmin, function(request, response){
    categoriasController.actualizar(request, response)
})

app.post("/categorias/borrar", obligalogin, soloadmin, function(request, response){
    categoriasController.borrar(request, response)
})

app.post("/categorias/buscarporcodigo", obligalogin, soloadmin, function(request, response){
    categoriasController.buscarporcodigo(request, response)
})



//*****************************************************CAROUSEL******************************************************************* */

var carouselController = require("./api/controladores/carouselController.js").carouselController
//const multer = require ('multer')
//const upload = multer({dest: 'uploads/'}) 

app.post("/carousel/registrar", function(request, response){
    carouselController.registrar(request, response)    
})

app.post("/carousel/listar", function(request, response){
    carouselController.listar(request, response)
})

app.post("/carousel/actualizar", upload.single('imagen'),function(request, response){
    carouselController.actualizar(request, response)
})

app.post("/carousel/borrar", function(request, response){
    carouselController.borrar(request, response)
})

app.post("/carousel/buscarporcodigo",  function(request, response){
    carouselController.buscarporcodigo(request, response)
})

app.post("/carousel/imagen", upload.single('imagen') , async function(request, response){
    const fs = require('fs')
    const body = request.body
    const imagen = request.file

    const processimagen = sharp(imagen.buffer)
    const resizeimagen = processimagen.resize(800, 200, {
        fit: "contain",
        background:"#FFF"
    })

    const newimagenresize = await resizeimagen.toBuffer()

    fs.writeFileSync('nuevaruta/prueba.png', newimagenresize )

    //response.send({resizeImage: newimagenresize})
    //console.log (processimagen)

})

