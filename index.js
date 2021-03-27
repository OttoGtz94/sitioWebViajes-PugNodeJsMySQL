import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar a BD mysql
db.authenticate()
	.then(() => console.log('Base de datos conectada'))
	.catch(err => console.log(err));

// Puerto
const port = process.env.PORT || 5000;

// Habilitar pug
app.set('view engine', 'pug');

// obtener el año actual por medio de un middleware
app.use((req, res, next) => {
	// para pasar una valores de un archivo a otro se utiliza .locals, que son como variables internas de express, ejem res.locals.unaVariable = "Texto"
	const year = new Date();
	res.locals.actualYear = year.getFullYear();
	res.locals.nombreSitio = 'Agencia de viajes';

	next(); // return next fuerza a pasar al siguiente midleware después de su ejecucion solo en caso que no cargue la GUI
});

// Agregar body parser para leer datos del formulario de testimoniales
app.use(express.urlencoded({ extended: true }));

// Agregar o definir la carpeta publica
app.use(express.static('public'));
// Agregar router
app.use('/', router);

app.listen(port, () => {
	console.log(
		`El servidor esta corriendo por el puerto ${port}`,
	);
});
