class Contador{
    constructor(responsable){
        this.responsable = responsable;
        this.conteo = 0;
    }
    static conteoGlobal = 0;

    obtenerResponsable = () => {
        return this.responsable;
    }
    obtenerCuentaIndividual = () => {
        return this.conteo;
    }
    obtenerCuentaGlobal = () => {
        return Contador.conteoGlobal;
    }
    contar = () => {
        this.conteo++;
        Contador.conteoGlobal++;
    }
}

let contador1 = new Contador('Mauricio')
let contador2 = new Contador('Evelin')
let contador3 = new Contador('Nicolas')

console.log(contador1.obtenerResponsable());
contador1.contar();

contador2.contar();
console.log(contador2.obtenerCuentaIndividual());

console.log(contador3.obtenerCuentaGlobal());

