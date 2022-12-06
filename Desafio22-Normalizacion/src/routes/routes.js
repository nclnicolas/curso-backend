import { Router } from 'express'
import { createProducts } from '../utils.js'

/*+++++++++++
+ ENRUTADOR +
++++++++++++*/

const router = Router()

router.get('/productos-test', (req, res) => {
    let infoProducts = createProducts()
    res.render('prodTable', { infoProducts })
})

export default router