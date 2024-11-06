var config = {}
config.puerto = process.env.PORT || 3000
config.nombrebd = "aliat"
config.listablanca =[
    'https://aliatesp-frontend.netlify.app/'//'http://localhost:4200'
]

config.secretsession ="Nana17122019"
config.tiemposession= (300000*2)
config.namecookie = "aliatcookie"
module.exports.config = config