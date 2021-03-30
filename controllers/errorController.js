exports.e404 = (req, res, next) => {
    res.status(404).render('error', {
        codigo: 'Error 404 (Not found)',
        mensaje: 'El servidor no pudo encontrar el contenido solicitado.'
    });
 };

exports.e422 = (req, res, next) => {
    res.status(422).render('error', {
        codigo: 'Error 422 (Unprocessable Entity)',
        mensaje: 'La petición estaba bien formada pero no se pudo seguir debido a errores de semántica.'
    });
};

exports.e500 = (req, res, next) => {
    res.status(500).render('error', {
        codigo: 'Error 500 (Internal Server Error)',
        mensaje: 'El servidor ha encontrado una situación que no sabe cómo manejarla.'
    });
};

exports.e503 = (req, res, next) => {
    res.status(503).render('error', {
        codigo: 'Error 503 (Service Unavailable)',
        mensaje: 'El servidor no está listo para manejar la petición.'
    });
};