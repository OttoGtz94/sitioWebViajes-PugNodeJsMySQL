import { Viaje } from '../models/viaje.model.js';
import { Testimonial } from '../models/testimoniales.model.js';

const paginaInicio = async (req, res) => {
	//req es lo que enviamos y res lo que express nos responde
	//send es para mostrar un texto en la pantalla
	// res.send('Hola mundo desde send');
	// json es para mostrar un archivo tipo json
	// res.json({
	// 	id: 1,
	// 	texto: 'hola mundo desde json',
	// });

	// consultar 3 viajes del modelo viaje
	try {
		const viajes = await Viaje.findAll({ limit: 3 });
		const testimoniales = await Testimonial.findAll({
			limit: 3,
			order: [['id', 'DESC']],
		});
		res.render('inicio', {
			pagina: 'Inicio',
			clase: 'home',
			viajes,
			testimoniales,
		}); //también se pueden pasar los valores por medio de un objeto
	} catch (error) {
		console.log(error);
	}
};

const paginaNosotros = (req, res) => {
	// Para pasar una variable a la vista creamos un objeto y ponemos llave y valor
	// const titulo = 'Viajes para todo y por todo el mundo';
	// res.render('nosotros', {
	// 	textoTitulo: titulo,
	// });
	// Es recomendable tener creada una master page para no repetir codigo html
	res.render('nosotros', {
		pagina: 'Nosotros',
	});
};

const paginaTestimoniales = async (req, res) => {
	try {
		const testimoniales = await Testimonial.findAll({
			order: [['id', 'DESC']],
		});
		res.render('testimoniales', {
			pagina: 'Testimoniales',
			testimoniales,
		});
	} catch (error) {
		console.log(error);
	}
};

const paginaViajes = async (req, res) => {
	// Consultar a la base de datos
	const viajes = await Viaje.findAll();
	console.log(viajes);

	res.render('viajes', {
		pagina: 'Viajes',
		viajes,
	});
};

// Mostrar un viaje por el slug
const paginaDetalleViaje = async (req, res) => {
	// console.log(req.params);
	const { slug } = req.params;
	try {
		const viaje = await Viaje.findOne({
			where: { slug },
		});

		res.render('viaje', {
			pagina: 'Información del viaje',
			viaje,
		});
	} catch (error) {
		console.log(error);
	}
};
export {
	paginaInicio,
	paginaNosotros,
	paginaTestimoniales,
	paginaViajes,
	paginaDetalleViaje,
};
