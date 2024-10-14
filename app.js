import express from 'express';
import userController from './controllers/userController.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import authController from './controllers/authControllers.js';

const app = express();

// Definir las IPs o dominios permitidos
const allowedOrigins = ['35.160.120.126'];

// Configurar las opciones de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Si no hay origen (por ejemplo, en solicitudes desde herramientas como Postman) o está en la lista de permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Se permite la solicitud
    } else {
      callback(new Error('Acceso no permitido por CORS'));  // Se rechaza la solicitud
    }
  },
  optionsSuccessStatus: 204 // Estado para respuestas pre-flight (OPCIONAL)
};

app.use(cors(corsOptions));  // Aplicar el middleware de CORS con las opciones
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authController);
app.use('/api', userController);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

