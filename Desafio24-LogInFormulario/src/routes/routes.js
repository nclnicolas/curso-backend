import { Router } from 'express'
import { createProducts } from '../utils.js'

/*+++++++++++
+ ENRUTADOR +
++++++++++++*/

const router = Router()

router.get('/productos-test', async (req, res) => {
    let infoProducts = createProducts()
    let infoSession = req.session.userName
    if (infoSession) {
        res.render('prodTable', { infoProducts, infoSession })
    } else {
        res.redirect('/api/login')
    }
})

router.get('/login', (req, res) => res.render('login'))

router.post('/login', (req, res) => {
    req.session.userName = req.body.nombre
    res.redirect('/api/productos-test')
})

router.get('/logout', (req, res) => {
    let infoUser = req.session.userName
    req.session.destroy(err => {
        if (err) {
            res.send(err)
        }
    })
    res.render('logout', { infoUser })
})

export default router