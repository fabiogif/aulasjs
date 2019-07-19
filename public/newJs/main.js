var tempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao")


$(function() {
    atualizaTamanhoFrase()
    inicializaContadores()
    inicializaCronometro()
    $("#botao-reiniciar").click(reiniciarJogo)
    inicializaMarcadores()
})

function atualizaTamanhoFrase() {
    var frase = $(".frase").text()
    var numeroPalavras = frase.split(" ").length
    $("#tamanhoFrase").text(numeroPalavras)
}


//Pegando o campo digitado no textarea 
function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val()
        var qtdPalavras = conteudo.split(/\S+/).length - 1
        $("#contador-palavras").text(qtdPalavras)
        var qptCaracteres = conteudo.length
        $("#contador-caracteres").text(qptCaracteres)

    })
}

// Iniciando o contador 
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text()
    campo.one("focus", function() {
        var conometroID = setInterval(function() {
            tempoRestante--
            $("#tempo-digitacao").text(tempoRestante)

            if (tempoRestante < 1) {
                campo.attr("disabled", true)
                campo.toggleClass("campo-desativado")
                clearInterval(conometroID) // limpando o setInterval, para não exibir numeros negativos 
            }
        }, 1000)
    })

}

function inicializaMarcadores() {
    var frase = $(".frase").text()

    campo.on('input', function() {
        var digitado = campo.val()
        var comparavel = frase.substr(0, digitado.length)
        var ehCorreto = (digitado == comparavel)
        campo.toggleClass("borda-correto", ehCorreto)
        campo.toggleClass("borda-incorreto", !ehCorreto)
    })
}



function reiniciarJogo() {
    campo.attr("disabled", false)
    campo.val("")
    $("#contador-palavras").text("0")
    $("#contador-caracteres").text("0")
    $("#tempo-digitacao").text(tempoInicial)
    campo.toggleClass("campo-desativado")
    campo.removeClass("borda-correto")
    campo.removeClass("borda-incorreto")

    inicializaCronometro()
}