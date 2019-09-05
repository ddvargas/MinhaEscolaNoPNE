var estados;
var escolas;
var escolasNomesApenas;
window.onload = function () {
    //Iniciar busca de estados
    if(self.fetch) {
        // execute minha solicitação do fetch
        console.log("Iniciando busca de estados");
        estados = fetch("https://biod.c3sl.ufpr.br/api/v1/data?dimensions=dim:estado:nome&metrics")
            .then(response => {
                return response.json();
            })
            .then(data => {listarEstados(data)})   ;
    } else {
        // faça solicitação de lista de estados por meio de XMLHttpRequest
    }

    // configurar os listeners dos componentes
    // var buttonBuscar = document.getElementById("btn_iniciar_pesquisa");
    // buttonBuscar.onsubmit(abrirReport);
    // var campoBusca = document.getElementById("campo_nome_escola");
    // campoBusca.addEventListener("keypress", abrirReport(event));

};


function listarEstados(estadosRetornados) {
    console.log(estadosRetornados);
    //testar o tamanho dos estados selecionados
    var estadosSelect  = document.getElementById("selecionar_estados");
    for (var i in estadosRetornados){
        var nome = estadosRetornados[i]["dim:estado:nome"];
        var op = new Option(nome, nome, false, false);
        estadosSelect.add(op)
    }
}

function itemEstadoMudado() {
    var sel = document.getElementById("selecionar_estados");
    var itemSelecionado = sel.options[sel.selectedIndex];
    if (self.fetch){
        //realizar busca pelo fetch
        var link = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:escola:nome,dim:escola:id,dim:cidade:id&filters=dim:estado:nome==";
        link += itemSelecionado.value.toString();
        fetch(link)
            .then(response => {return response.json();})
            .then( data => {recuperarDados(data);});

        console.log("buscou escolas");

    }else{
        //realizar busca por meio de XMLHttpRequest
    }
}

/**
 * Função que coloca os dados retorndos numa variável e filtra apenas os nomes em outra variável.
 * @param retornados dados retornados da consulta
 */
function recuperarDados(retornados) {
    escolas = retornados;
    escolasNomesApenas = new Array();
    for (var i in retornados){
        escolasNomesApenas.push(retornados[i]["dim:escola:nome"]);
    }
    console.log(escolas);
    console.log(escolasNomesApenas);
}

/**
 * Função que recupera o id da escola ou universidade e abre a página de resultado
 */
function abrirReport() {
    var campo_nome = document.getElementById("campo_nome_escola");
    var valorDigitado = campo_nome.innerHTML.valueOf();
    if (!valorDigitado.localeCompare("")){
        //abrir nova página
        console.log("Entrou no if");
        var idEscola;
        for(var i in escolas){
            var nomeEscola = escolas[i]["dim:escola:nome"];
            if (nomeEscola.localeCompare(valorDigitado)){
                idEscola = escolas[i]["dim:escola:id"];
                break;
            }
        }
        window.location.href = "resultadoEscola.html?escolaID=" + idEscola; //+ "?_ijt=3gh9apnspscth9ckpgq1ua8ohi";
    }else{
        window.alert("Você deve digitar o nome de uma escola");
    }
    // event.preventDefault();
}