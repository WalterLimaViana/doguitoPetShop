import { valida } from './validacao.js'
// Essa função irá pegar todos os inputs para validar, principalmente se tiver outrs dados de datas
const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    if (input.dataset.tipo === 'preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
    }
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})

