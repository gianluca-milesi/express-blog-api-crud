function notFound(req, res, next) {
    res.status(404);
    res.json({
        error: "Page not found",
        message: "Pagina non trovata"
    });
};

module.exports = notFound;