import { valida } from './validacao.js'
// Essa função irá pegar todos os inputs para validar, principalmente se tiver outrs dados de datas
const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})

