const random = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
}

const createArrayRandom = (cantidad) => {
    const arr = []
    for (let i = 0; i <= cantidad; i++) arr.push(random())
    return arr
}

const objNumRandomGenerate = (cant) => {
    const arr = cant ? createArrayRandom(cant) : createArrayRandom(100000000)
    const obj = {}
    arr.forEach(num => obj[num] = obj[num] ? ++obj[num] : 1)
    return obj
}

process.on('exit', () => {
    console.log(`Proceso finalizado`)
})

process.on('message', cantidad => {
    console.log(`Comenzando cracion de objeto`)
    const obj = objNumRandomGenerate(cantidad)
    process.send(obj)
    console.log(`Objeto creado y enviado`)
    process.exit()
})