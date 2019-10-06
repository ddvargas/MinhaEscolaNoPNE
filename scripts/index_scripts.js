var estados;
var escolas;
var escolasNomesApenas = [];
const separadorCidadeEscola = " - ";
window.onload = function () {
    //Iniciar busca de estados
    if (self.fetch) {
        // execute minha solicitação do fetch
        console.log("Iniciando busca de estados");
        fetch("https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:estado:nome")
            .then(response => {
                return response.json();
            })
            .then(data => {
                listarEstados(data);
            });
    } else {
        // faça solicitação de lista de estados por meio de XMLHttpRequest
    }

};


function listarEstados(estadosRetornados) {
    //console.log(estadosRetornados);

    // ordena e imprime estados retornados
    var estadosOrdenados = [];
    for (var i in estadosRetornados) {
        var nome = estadosRetornados[i]["dim:estado:nome"];
        estadosOrdenados.push(nome);
    }
    estadosOrdenados.sort();
    console.log(estadosOrdenados);

    //testar o tamanho dos estados selecionados
    // e adiciona ao select da página index
    var estadosSelect = document.getElementById("selecionar_estados");
    for (var i in estadosOrdenados) {
        var nome = estadosOrdenados[i];
        var op = new Option(nome, nome, false, false);
        estadosSelect.add(op)
    }
}

function itemEstadoMudado() {
    var sel = document.getElementById("selecionar_estados");
    var itemSelecionado = sel.options[sel.selectedIndex];
    if (self.fetch) {
        //realizar busca pelo fetch
        var link = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:escola:nome,dim:escola:id,dim:cidade:nome&filters=dim:estado:nome==";
        link += itemSelecionado.value.toString();
        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                recuperarDados(data);
            });

        console.log("buscou escolas");

    } else {
        //realizar busca por meio de XMLHttpRequest
    }
}

/**
 * Função que coloca os dados retorndos numa variável e filtra apenas os nomes em outra variável.
 * @param retornados dados retornados da consulta
 */
function recuperarDados(retornados) {
    escolas = retornados;
    limparArray(escolasNomesApenas);
    for (var i in retornados) {
        var nome = formatarInstituicao(retornados[i]["dim:escola:nome"]);
        var cidadeNome = formatarCidade(retornados[i]["dim:cidade:nome"]);
        escolasNomesApenas.push(nome + separadorCidadeEscola + cidadeNome);
    }
    console.log(escolas);
    console.log(escolasNomesApenas);
}

/**
 * Remove todos os elementos do array.
 * @param array lista a ser limpa
 */
function limparArray(array) {
    while(array.length > 0) {
        array.pop();
    }
}

/**
 * Formata o nome da cidade para tirar  o \t e deixar as letras iniciais maiusculas
 * @param instituicao
 * @returns {string}
 */
function formatarInstituicao(instituicao) {
    if (instituicao){
        var wordsToIgnore = ["das", "dos", "da", "do", "de"];
        var minLenght = 3;

        var instituicaoNova = "";

        instituicao = instituicao.toLowerCase();
        instituicao = instituicao.replace(/\t/g, ' ');
        instituicao = getWords(instituicao);
        for (var i in instituicao){
            if (wordsToIgnore.indexOf(instituicao[i]) == -1 && instituicao[i].length > minLenght){
                instituicao[i] = instituicao[i].charAt(0).toUpperCase() + instituicao[i].slice(1);
            }
            instituicaoNova += instituicao[i];
        }

        instituicao = instituicaoNova;
    }

    return instituicao;
}

/**
 * Retorna um vetor de palavras existentes em uma frase
 * @param frase
 * @returns {*|boolean|Promise<Response | undefined>|RegExpMatchArray}
 */
function getWords(frase) {
    return frase.match(/\S+\s*/g);
}

/**
 * Formata o nome da cidade para tirar  o \t e deixar as letras iniciais maiusculas
 * @param cidade string a ser formatada
 * @returns {*|boolean|Promise<Response|undefined>|RegExpMatchArray}
 */
function formatarCidade(cidade) {
    if (cidade){
        var wordsToIgnore = ["das", "dos", "da", "do", "de", "dalla"];
        var minLenght = 3;
        var cidadeNova = "";

        cidade = cidade.toLowerCase();
        cidade = cidade.replace(/\t/g, ' ');
        cidade = getWords(cidade);
        for (var i in cidade){
            if (wordsToIgnore.indexOf(cidade[i]) == -1 && cidade[i].length > minLenght){
                cidade[i] = cidade[i].charAt(0).toUpperCase() + cidade[i].slice(1);
            }
            cidadeNova += cidade[i];
        }
        cidade = cidadeNova;
    }
    return cidade;
}

/**
 * Função que recupera o id da escola ou universidade e abre a página de resultado
 */
function abrirReport() {
    var campo_nome = document.getElementById("campo_nome_escola");
    console.log("Valor digitado: " + valorDigitado);

    var valorDigitado = campo_nome.value;
    if (!(valorDigitado == "")) {
        //abrir nova página
        valorDigitado = valorDigitado.replace(/\s/g, '');
        valorDigitado = valorDigitado.toLowerCase();
        var idEscola = 0;

        console.log("Entrou no if");
        for (var i in escolas) {
            var nomeEscola = escolas[i]["dim:escola:nome"];
            nomeEscola = nomeEscola.toLowerCase();
            nomeEscola = nomeEscola.replace(/\s/g, '');
            if (nomeEscola == valorDigitado) {
                idEscola = escolas[i]["dim:escola:id"];
                break;
            }
        }
        if (idEscola > 0) {
            window.location.href = "resultadoEscola.html?escolaID=" + idEscola;
        } else {
            window.alert("Não foi possível encontrar a instituição.");
        }
    } else {
        window.alert("Você deve digitar o nome de uma instituição.");
    }
}


/**
 * Função que preenche o campo de nome da escola de acordo com o indice do item selecionado do autocomplete.
 * @param value indice do item selecionado no autocomplete.
 */
function autoPreencherCampoBusca(value) {
    if (value){
        var campoNomeEscola = document.getElementById("campo_nome_escola");
        var nomeSelecionado = value.split(separadorCidadeEscola);
        campoNomeEscola.value = nomeSelecionado[0].trim();
    }
}



/**
 * Plugin de autocomplete
 * @type {{data: *, theme: string, list: {match: {enabled: boolean}}}}
 */
var options = {
    data: escolasNomesApenas,
    list: {
        // numero máximo de elementos que deve aparecer na lista de opçãos
        maxNumberOfElements: 12,
        //?
        match: {
            enabled: true
        },
        //Ordena os resultados por ordem alfabetica
        sort: {
            enabled: true
        },
        //animação ao mostrar
        showAnimation: {
            type: "slide", //normal|slide|fade
            time: 400,//tempo duracao
            callback: function() {}
        },
        //animacao ao esconder
        hideAnimation: {
            type: "slide", //normal|slide|fade
            time: 400,//tempo duracao
            callback: function() {}
        },
        //tema/estilo
        // theme: "dark",
        //recupera o indice do item selecionado
        onChooseEvent: function () {
            var indiceSelecionadoNoAutocomplete = $("#campo_nome_escola").getSelectedItemData();
            console.log("indiceSelecionadoNoAutocomplete: "  +  indiceSelecionadoNoAutocomplete);
            autoPreencherCampoBusca(indiceSelecionadoNoAutocomplete);
        }
    },

    theme: "square"
};
$("#campo_nome_escola").easyAutocomplete(options);
