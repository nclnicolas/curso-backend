// import { faker } from '@faker-js/faker/locale/es'
const { faker } = require('@faker-js/faker/locale/es')

/*++++++++++++++++++++++++++ 
+  CREAR PRODUCTOS RANDOM  +
+++++++++++++++++++++++++++*/

const createProducts = () => {
    let arr = []
    for (let i = 0; i < 5; i++) {
        arr.push({
            nombre: faker.commerce.product(),
            precio: faker.finance.amount(),
            foto: faker.internet.avatar()
        })
    }
    return (arr)
}

module.exports = { createProducts }