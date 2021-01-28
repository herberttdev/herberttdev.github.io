const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
})

function calcular (peso, altura) {

    // checar se o peso/altura são validos
    if (Number(peso) + 1 === NaN || peso === '' || peso == ' ' || peso === null || peso === undefined) {
        document.getElementById('invalido').innerHTML = '<div class="uk-alert-danger uk-animation-shake" uk-alert style="margin-top: 10px;"><a class="uk-alert-close uk-border-rounded" uk-alert-close uk-icon="close"></a><h3>Peso invalido!</h3></div>'
    } else if (Number(altura) + 1 === NaN || altura === '' || altura == ' ' || altura === null || altura === undefined) {
        document.getElementById('invalido').innerHTML = '<div class="uk-alert-danger uk-animation-shake" uk-alert style="margin-top: 10px;"><a class="uk-alert-close uk-border-rounded" uk-alert-close uk-icon="close"></a><h3>Altura invalida!</h3></div>'
    }

    peso = peso.replace(',', '.')
    altura = altura.replace(',', '.')

    peso = Number(peso)
    altura = Number(altura)

    let imcTemp = peso / (altura * altura)
    const IMC = imcTemp.toFixed(2)

    // exibir resultado
    if (IMC < 18.5) {
        resultado.innerHTML = `<div id="magreza" class="uk-container uk-border-rounded uk-text-center"style="background-color:rgb(255, 193, 77);margin-top: 10px;padding: 5px;"><h3 style="margin-bottom: 0px;">Seu IMC é ${IMC} - <b>magreza<b></h3></div>`
    } else if (IMC >= 18 && IMC <= 24.9) {
        resultado.innerHTML = `<div id="normal" class="uk-container uk-border-rounded uk-text-center"style="background-color: rgb(77, 255, 86);margin-top: 10px;padding: 5px;"><h3 style="margin-bottom: 0px;">Seu IMC é ${IMC} - <b>normal<b></h3></div>`
    } else if (IMC >= 25 && IMC <= 29.9) {
        resultado.innerHTML = `<div id="sobrepeso" class="uk-container uk-border-rounded uk-text-center"style="background-color:rgb(255, 193, 77);margin-top: 10px;padding: 5px;"><h3 style="margin-bottom: 0px;">Seu IMC é ${IMC} - <b>sobrepeso<b></h3></div>`
    } else if (IMC >= 30 && IMC <= 39.9) {
        resultado.innerHTML = `<div id="grau2" class="uk-container uk-border-rounded uk-text-center"style="background-color:rgb(255, 166, 0);margin-top: 10px;padding: 5px;"><h3 style="margin-bottom: 0px;">Seu IMC é ${IMC} - <b>obesidade grau 2<b></h3></div>`
    } else if (IMC >= 40) {
        resultado.innerHTML = `<div id="grau3" class="uk-container uk-border-rounded uk-text-center"style="background-color:rgb(255, 60, 60);margin-top: 10px;padding: 5px;"><h3 style="margin-bottom: 0px;">Seu IMC é ${IMC} - <b>obesidade grave<b></h3></div>`
    }

}
