import { fork } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const ramdomController = (req, res) => {
    const cant = req.query.cant || 100000000
    const objRandom = fork(path.join(__dirname, '../utils/objRandom.js'))
    objRandom.send(cant)
    objRandom.on('message', obj => {
        res.send(obj)
    })
}