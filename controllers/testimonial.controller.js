import { Testimonial } from '../models/testimoniales.model.js';
const guardarTestimonial = async (req, res) => {
	// si lo enviamos así aparecera como undefined, necesitamos body parser para poder leer los datos, el body parser en el index donde esta nuestro app
	console.log(req.body);

	// Validar formulario
	const { nombre, correo, mensaje } = req.body;
	const errores = [];

	if (nombre.trim() === '') {
		errores.push({ mensaje: 'Escribe tu nombre' });
	}
	if (correo.trim() === '') {
		errores.push({ mensaje: 'Escribe tu correo' });
	}
	if (mensaje.trim() === '') {
		errores.push({ mensaje: 'Escribe un mensaje' });
	}

	if (errores.length > 0) {
		// consultar testimoniales existentes
		const testimoniales = await Testimonial.findAll({
			limit: 3,
			order: [['id', 'DESC']],
		});
		// Mostrar la vista con errores
		res.render('testimoniales', {
			pagina: 'Testimoniales',
			errores,
			nombre,
			correo,
			mensaje,
			testimoniales,
		});
	} else {
		// almacenar en la BD
		try {
			await Testimonial.create({
				nombre,
				correo,
				mensaje,
			});
			res.redirect('/');
		} catch (error) {
			console.log(error);
		}
	}
};

export { guardarTestimonial };
