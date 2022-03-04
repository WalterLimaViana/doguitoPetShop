//Para acessar a função dataNascimento, caso tenha mais de uma function do tipo data
export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    // if para mostrar a mensagem inválido
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

// constante com os tipos de erro
const tiposDeErro = [
    'valueMissing',
    'typeMissing',
    'patternMismatch',
    'customError'
]


// Tipos de mensagens de erro que serão exibidas. É preciso indicar o nome e as mensagens que serão exibidas na tela
const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo email nome não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'A senha deve ser de 6 a 12 dígitos e conter pleo lenos uma letra minúscula, uma maiúscula, um número e não conter símbolos'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar'

    }


}
// Objeto que será chamado na function valida
const validadores = {
    dataNascimento: input => validaDataNascimento(input)
}

//Função da menssagem de error
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        //O if vai verificar se o erro que consta no input é true, se sim ele vai pegar o tipo de Input e a mensagem de erro a ele associada
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    return mensagem
}

//Função que será declarada no código html
const dataNascimento = document.querySelector('#nascimento')

dataNascimento.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target)
})

//Função que indica se é maior ou menor de 18 anos
function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if (!maiorQue18(dataRecebida)) {

        mensagem = 'Você deve ser maior de 18 anos para se cadastrar'
    }

    input.setCustomValidity(mensagem)
}

// função que pega o valor  da data inserida no input e verifica se é menor que 18 anos

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}