export default function embaralhar(valores){
    return valores.map(valor => {
        return {
            valor: valor,
            aleatorio: Math.random()
        }
    })
    .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio)
    .map(resultado => resultado.valor)
}