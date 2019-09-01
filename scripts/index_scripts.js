var estados;
var escolas;
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


function listarEstados(estadosRetornados) {
    console.log(estadosRetornados);
    //testar o tamanho dos estados selecionados
    var estadosSelect  = document.getElementById("selecionar_estados");
    for (var i = 0; i <= estadosRetornados.length; i++){
        var nome = estadosRetornados[i]["dim:estado:nome"];
        var op = new Option(nome, nome);
        estadosSelect.add(op)
    }
}