var estados;
var escolas;

window.onload = function () {
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

function recuperarDados(retornados) {
    escolas = retornados;
    console.log(escolas);
}