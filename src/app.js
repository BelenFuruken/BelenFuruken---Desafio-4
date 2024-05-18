import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from '../src/routes/views.router.js'
//IMPORTAR SERVER a partir del server http
import {Server, Socket} from 'socket.io'

const app = express()
const PORT = 8090
const httpServer = app.listen(PORT, ()=>{console.log('Server funcionando en el puerto ' + PORT)})

let products = []

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))

app.use("/", viewsRouter)

socketServer.on('connection', socket=>{ // 1° param -> NOMBRE DEL EVENTO y 2° param -> callback
    console.log("Nuevo cliente conectado")
    socket.on('nuevoProducto', P=>{
        products.push(P)
        socket.emit('nuevoProducto', products)
    })
})

export default products