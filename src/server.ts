import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.ts'
import router from './router.ts'
import db from './config/db.ts'

//conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.bgGreen.bold('Conexión exitosa a la DB'))
    } catch (error) {
        console.log( colors.bgRed.bold('Hubo un error al conectar a la BD'))
        console.log(error)
    }
}
connectDB()

// instancia de express
const server = express()

// permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes sin 'origin' (como Postman o scripts locales)
        if (!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de Cors'))
        }
    },
}
server.use(cors(corsOptions))

// leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

// docs
server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server