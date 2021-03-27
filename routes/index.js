import express from 'express';
import {
	paginaInicio,
	paginaNosotros,
	paginaViajes,
	paginaTestimoniales,
	paginaDetalleViaje,
} from '../controllers/paginas.controller.js';
import { guardarTestimonial } from '../controllers/testimonial.controller.js';

const router = express.Router();

// ejemplo de rutas sin controlador
// router.get('/', (req, res) => {
// 	//req es lo que enviamos y res lo que express nos responde
// 	//send es para mostrar un texto en la pantalla
// 	// res.send('Hola mundo desde send');
// 	// json es para mostrar un archivo tipo json
// 	// res.json({
// 	// 	id: 1,
// 	// 	texto: 'hola mundo desde json',
// 	// });

// 	res.render('inicio', {
// 		pagina: 'Inicio',
// 	}); //también se pueden pasar los valores por medio de un objeto
// });

// rutas usando controlador
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);

router.post('/testimoniales', guardarTestimonial);

export default router;
