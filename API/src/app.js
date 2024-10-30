// importacion y ejecucion de express
import express from 'express'
import config from './config'
import routes from './routes'


const app = express()

//configueracion del puerto
app.set('port', config.port)

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//rutas
app.use(routes)
export default app