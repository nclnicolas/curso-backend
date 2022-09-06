import express from 'express';
import { Perimetro } from './perimetro';
import { Superficie } from './superficie';
const app = express();


const perimetro:Perimetro = new Perimetro();
const superficie:Superficie = new Superficie();

app.get('/perimetro/:figura/:param1/:param2?', (req, res) => {
    const {figura, param1, param2} = req.params;
    let result:any;

    switch (figura) {
        case 'cuadrado':
            result = perimetro.cuadrado(Number(param1))
            break;
        case 'rectangulo':
            result = perimetro.rectangulo(Number(param1), Number(param2))
            break;
        
            case 'circulo':
            result = perimetro.circulo(Number(param1))
            break;
    
        default:
            break;
    }
    res.send({resultado: result})
})

app.get('/superficie/:figura/:param1/:param2?', (req, res) => {
    const {figura, param1, param2} = req.params;
    let result:any;

    switch (figura) {
        case 'cuadrado':
            result = superficie.cuadrado(Number(param1))
            break;
        case 'rectangulo':
            result = superficie.rectangulo(Number(param1), Number(param2))
            break;
        
            case 'circulo':
            result = superficie.circulo(Number(param1))
            break;
    
        default:
            break;
    }
    res.send({resultado: result})
})




const PORT = 3000
app.listen(PORT, () => {console.log(`Server On PORT ${PORT}`)}
)