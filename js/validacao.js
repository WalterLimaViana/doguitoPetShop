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
        patternMismatch: 'A senha deve ser de 6 a 12 dígitos e conter pelo menos uma letra minúscula, uma maiúscula, um número e não conter símbolos'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar'

    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'

    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo Logradouro não pode estar vazio.',
    },
    cidade: {
        valueMissing: 'O campo Cidade não pode estar vazio.',
    },
    estado: {
        valueMissing: 'O campo Estado não pode estar vazio.',
    }



}
// Objeto que será chamado na function valida
const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCEP(input)
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

//função de validação do CPF
function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, ' ')
    let mensagem = ''

    if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem)
}
// validação dos numéros repetidos
function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]
    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if (valor == cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}
// essa função informa o tamanho da estrutura
function checaEstruturaCPF(cpf) {
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
}
// checagem dos dígitos
function checaDigitoVerificador(cpf, multiplicador) {
    //esse if é para encerrar o multiplicador até a soma der 11 digitos
    if (multiplicador >= 12) {
        return true
    }
    //esse é o cálculo para validar a soma dos digitos do cpf
    let multiplicadorInicial = multiplicador
    let soma = 0
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)
    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
}
// cálculo da soma
function confirmaDigito(soma) {
    return 11 - (soma % 11)
}

//função que enviará para o API viaCEP
function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }
    //validações de preenchimento para mostrar um erro caso o CEP seja inválido ou que não consegue buscar no viacep
    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options).then
            (response => response.json()
            ).then(
                data => {
                    if (data.erro) {
                        input.setCustomValidity('Não foi possível buscar o CEP.')
                        return
                    }

                    input.setCustomValidity('')
                    preencheCamposComCEP(data)
                    return
                }
            )
    }
}
// função para preencher os campos logradouro, cidade e estado automaticamente
function preencheCamposComCEP(data) {
    // constante onde serão armazaenadas os dados
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')
    //local onde serão buscadas essas informações
    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}