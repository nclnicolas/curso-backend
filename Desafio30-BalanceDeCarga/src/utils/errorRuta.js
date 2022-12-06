import { logger } from "../config/logger.js"

export const error404 = (req, res) => {
    logger.warn(`Ruta no encontrada`)
    res.status(404).render('errorRuta')
}