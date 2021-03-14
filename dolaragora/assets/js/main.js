// vai fazer o primeiro request
setTimeout(function () {
    axios('https://economia.awesomeapi.com.br/json/all/usd')
        .then(response => exibirValor(response.data))
    console.log('primeira request executada')
}, 0.1)


// vai fzr a request de 30 em 30 segundos
let acumulador = 1
setInterval(function () {
    axios('https://economia.awesomeapi.com.br/json/all/usd')
        .then(response => exibirValor(response.data))
    console.log(`Atualizou! [${acumulador}]`)
    acumulador++
}, (30 * 1000))

const usdInput = document.querySelector('.usdInput')
const brlInput = document.querySelector('.brlInput')

usdInput.focus()

function exibirValor(json) {

    brlInput.setAttribute('placeholder', (Number(json.USD.bid)).toFixed(2))

    document.addEventListener('click', click => {
        if (click.target.classList.contains('usdInput')) click.target.select()
        if (click.target.classList.contains('brlInput')) click.target.select()
    })

    document.addEventListener('change', e => {
        if (e.target.classList.contains('usdInput')) {
            converterUSDBRL(json.USD.bid, usdInput.value)
        }

        if (e.target.classList.contains('brlInput')) {
            converterBRLUSD(json.USD.bid, brlInput.value)
        }
    })
}

function converterUSDBRL(usdEmBrl) {
    try {
        eval(usdInput.value)
    } catch {
        usdInput.value = null
        return
    }

    if (conversaoBloqueada === true) {
        usdInput.value = null
        brlInput.value = null
    }

    usdInput.value = (usdInput.value).replace(',', '.')
    usdInput.value = Number(usdInput.value).toFixed(2)
    brlInput.value = (eval(usdInput.value * usdEmBrl)).toFixed(2)
}

function converterBRLUSD(usdEmBrl) {
    try {
        eval(brlInput.value)
    } catch {
        brlInput.value = null
        return
    }

    if (conversaoBloqueada === true) {
        usdInput.value = null
        brlInput.value = null
    }

    brlInput.value = (brlInput.value).replace(',', '.')
    brlInput.value = Number(brlInput.value).toFixed(2)
    usdInput.value = (eval(brlInput.value / usdEmBrl)).toFixed(2)
}

let conversaoBloqueada = false
setTimeout(() => {
    conversaoBloqueada = true
    const apoieLink = document.querySelectorAll('.apoieLink')

    document.querySelector('.usdInput').setAttribute('disabled', 'true')
    
    document.querySelector('.usdInput').style.cursor = 'not-allowed'

    document.querySelector('.brlInput').setAttribute('disabled', 'true')

    document.querySelector('.brlInput').style.cursor = 'not-allowed'

    apoieLink[0].classList.add('uk-hidden')
    apoieLink[1].classList.add('uk-hidden')

    const divDesbloqConvers = document.querySelector('.desbloquearConversao')
    divDesbloqConvers.classList.remove('uk-hidden')
    divDesbloqConvers.classList.add('uk-animation-shake')
}, 30 * 1000)

document.addEventListener('click', click => {
    const clickTarget = click.target
    if (clickTarget === document.getElementById('desbloquearConversao')) {
        conversaoBloqueada = false
        clickTarget.classList.add('uk-hidden')

        document.querySelector('.usdInput').removeAttribute('disabled')
        document.querySelector('.usdInput').style.cursor = 'text'

        document.querySelector('.brlInput').removeAttribute('disabled')
        document.querySelector('.brlInput').style.cursor = 'text'

        const apoieLink = document.querySelectorAll('.apoieLink')
        apoieLink[0].classList.remove('uk-hidden')
        apoieLink[1].classList.remove('uk-hidden')
    }
})
