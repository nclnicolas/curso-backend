import { faker } from '@faker-js/faker/locale/es'

/*++++++++++++++++++++++++++ 
+  CREAR PRODUCTOS RANDOM  +
+++++++++++++++++++++++++++*/

export const createProducts = () => {
    let arr = []
    for (let i = 0; i < 5; i++) {
        arr.push({
            nombre: faker.commerce.product(),
            precio: faker.finance.amount(),
            foto: faker.internet.avatar()
        })
    }
    return(arr)
}