var largura = 0
var altura = 0
var vidas = 1
var tempo = 15
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1s e meio
	var criaMosquitoTempo = 1500

} else if (nivel === 'dificil') {
	//1s
	var criaMosquitoTempo = 1000

} else if (nivel === 'insano') {
	//0.75s
	var criaMosquitoTempo = 750

}

function tamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(largura, altura)
}

tamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1
	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href ='vitoria.html'
	} else {

		document.getElementById('cronometro').innerHTML = tempo
	}
}, 1000)


function posicaoRandomica() {

//remover mosquito anterior automaticamente (caso exista)
// if identifica o se elemento existe e se for 'true' aplica a remoção com .remove
if(document.getElementById('mosquito')) {
	document.getElementById('mosquito').remove()

	//console.log('o elemento selecionado foi: v' + vidas)

	if(vidas > 3) {

		window.location.href ='fim_de_jogo.html'
		
	} else {
		//comando abaixo concatena a string v com a var vidas que começa valendo 1 (resultando nos ids v1, v2 e v3)
		document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
		vidas++
	}
}



// Math.random() gera valores aleatório de 0 a 1
// Math.floor() arredonda os valores para baixo
// -90 de altura e largura para evitar o estouro da img
var posicaoX = Math.floor(Math.random() * largura) - 90
var posicaoY = Math.floor(Math.random() * altura) - 90

// as estruturas condicionais abaixo impedem a criação de valores negativos (o que causaria a não visualização do mosquito na tela)
if (posicaoX < 0) {
	posicaoX = 0
} else {
	posicaoX = posicaoX
}

if (posicaoY < 0) {
	posicaoY = 0
} else {
	posicaoY = posicaoY
}

console.log(posicaoX, posicaoY)


/// criar o elemento html
//Nesse ponto basicamente estamos repetindo o processo feito no html, porém de forma programatica. 
var mosquito = document.createElement('img')
mosquito.src = 'imagens/mosquito.png'
// .className atribui os elementos do CSS a imagem (o espaço entre elas é importante para o funcionamento)
mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
mosquito.style.left = posicaoX + 'px'
mosquito.style.top = posicaoY + 'px'
mosquito.style.position = 'absolute'
mosquito.id = 'mosquito'
mosquito.onclick = function () {
	this.remove() // como a função ja esta associada ao elemento .mosquito, o this faz com que o remove atue sobre ele
	var audio1 = new Audio();
    audio1.src = "som/stab3.wav";
    audio1.play();
}

document.body.appendChild(mosquito) // adicionando um "filho" ao boddy


}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)	
// traduzindo: se classe for = 0 aplique 'mosquito1' e assim sucessivamente
// Utilizando o return em cada instrução n é necessário colocar o break (o próprio return interrompe)
	switch(classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)	

	switch(classe) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
	}
}

