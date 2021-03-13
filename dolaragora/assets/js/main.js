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

    brlInput.value = (brlInput.value).replace(',', '.')
    brlInput.value = Number(brlInput.value).toFixed(2)
    usdInput.value = (eval(brlInput.value / usdEmBrl)).toFixed(2)
}
