var instituicoes = [];

/**
 * Definição da estrutura de uma instituição
 * @param idInstituicao id unico retornado da base de dados
 * @param nomeInstituicao nome retornado da base de dados
 * @param tipo tipo de instituição (ies/escola)
 * @constructor
 */
function Instituicao(idInstituicao, nomeInstituicao, tipo) {
    this.id = idInstituicao;
    this.nome = nomeInstituicao;
    this.tipo = tipo;
    this.metas = [];
}

/**
 * Definição de uma estrutura de metas e notas
 * @param idMeta numero da meta
 * @param nomeMeta nome da meta
 * @param notaMeta nota da instituição para a meta
 * @constructor
 */
function Meta(idMeta, nomeMeta, notaMeta){
    this.id = idMeta;
    this.nome = nomeMeta;
    this.nota = nomeMeta;
}

/**
 * Estrutura de uma cidade
 * @param idCidade id dela retornado da base de dados
 * @param nomeCidade nome dela retornad da base de dados
 * @constructor
 */
function Cidade(idCidade, nomeCidade) {
    this.id = idCidade;
    this.nome = nomeCidade;
}

window.onload = function () {
    preloader(0);
    document.getElementById("preloader").style.display = 'none';
    document.getElementById("resultado").style.display = 'none';
    listarMetricasDisponíveis();
    carregarEstados();
}

/**
 * Lista as metas disponíveis para
 */
function listarMetricasDisponíveis() {
    var select = document.getElementById("selecionar_meta");
    if (select) {
        for (var i = 1; i <= 20; i++) {
            var option = new Option("Meta " + i, i, false, false);
            select.add(option);
        }
    }
}

/**
 * Remove todos os elementos do array.
 * @param array lista a ser limpa
 */
function limparArray(array) {
    while (array.length > 0) {
        array.pop();
    }
}

/**
 * Recupera a lista de estados da base de dados.
 */
function carregarEstados() {
    var xmlRequest = new XMLHttpRequest();
    var sel = document.getElementById("selecionar_estados");

    xmlRequest.open("GET", "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:estado:nome", false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarEstados(JSON.parse(xmlRequest.response))
    }
}

/**
 * Recebe uma lista de estados e coloca na interface.
 * @param response lista de estados a serem mostrados.
 */
function recuperarEstados(response) {
    if (response) {
        var listaEstados = document.getElementById("selecionar_estados");
        var nomeEstados = [];

        for (var i in response) {
            nomeEstados.push(response[i]["dim:estado:nome"]);
        }

        nomeEstados.sort();
        for (var i in response) {
            var option = new Option(nomeEstados[i], nomeEstados[i], false, false);
            listaEstados.add(option);
        }
    }
}

/**
 * Limpa da interface as opções mostradas na lista
 * @param idLista id da lista de opções que se quer limpar
 * @param primeiroItem primeiro item selecionado na lista, null para nenhum item.
 */
function limparListaDeOpcoes(idLista, primeiroItem) {
    if (idLista) {
        var select = document.getElementById(idLista);
        if (select) {
            for (var i in select.options) {
                select.options[i] = null;
            }
        }

        if (primeiroItem) {
            select.add(new Option(primeiroItem, primeiroItem, true, true));
        }
    }
}

/**
 * Recupera da base de dados a lista de municípios do estado selecionado na interface
 */
function recuperarMunicipios() {
    var estado = document.getElementById("selecionar_estados");
    var estadoSelecionado = estado.options[estado.selectedIndex].value;

    if (estadoSelecionado != "Selecionar") {
        var xmlRequest = new XMLHttpRequest();
        var url = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:cidade:nome,dim:cidade:id&filters=dim:estado:nome==" + estadoSelecionado;

        xmlRequest.open("GET", url, false);
        xmlRequest.send(null);
        if (xmlRequest.readyState === 4) {
            listarMunicipios(JSON.parse(xmlRequest.response));
        }
    } else {
        window.alert("Selecione um estado antes.");
    }
}

/**
 * Recebe uma lista de cidades e coloca na lista de opções do selection na interface
 * @param response lista de cidades a serem mostradas
 */
function listarMunicipios(response) {
    if (response) {
        var cidadesOptions = document.getElementById("selecionar_cidades");
        var cidades = [];

        for (var i in response) {
            cidades.push(new Cidade(response[i]["dim:cidade:id"], formatarCidade(response[i]["dim:cidade:nome"])));
        }
        cidades.sort(function (a, b) {
            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });
        for (var i in cidades) {
            cidadesOptions.add(new Option(cidades[i].nome, cidades[i].id, false, false));
        }
    }
}

/**
 * Define o comportamento de quando um item de cidade é mudado
 */
function itemMunicipiosMudado() {
    //desselecionar a opção de tipo de instituição e o número da meta
    var select = document.getElementById("selecionar_tipoInstituicao");
    select.selectedIndex = 0;
    select = document.getElementById("selecionar_meta");
    select.selectedIndex = 0;
}

/**
 * Quando um novo estado é selecionado, a lista de municípios é limpa e uma nova é recuperada;
 *
 * */
function itemEstadoMudado() {
    limparListaDeOpcoes("selecionar_cidades", "Selecionar município...");
    document.getElementById("selecionar_tipoInstituicao").selectedIndex = 0;
    document.getElementById("selecionar_meta").selectedIndex = 0;
    recuperarMunicipios();
}

/**
 * Compartamento quando o tipo de instituição é mudado
 */
function itemTipoInstituicaoMudado() {
    //TODO: limpar lista de instituições atual
    //TODO: carregar as instituições novamente
    recuperarInstituicoes();
}

/**
 * Cnsulta a base de dados para recuperar a lista de instituições existentes
 */
function recuperarInstituicoes() {
    var selectEstado = document.getElementById("selecionar_estados");
    var selectMunicipio = document.getElementById("selecionar_cidades");
    var selectTipo = document.getElementById("selecionar_tipoInstituicao");

    var estado = selectEstado.options[selectEstado.selectedIndex].value;
    var municipio = selectMunicipio.options[selectMunicipio.selectedIndex].value;
    var tipo = selectTipo.options[selectTipo.selectedIndex].value;

    if (estado != "Selecionar") {
        if (municipio != "Selecionar") {
            if (tipo != "Selecionar") {
                var xmlRequest = new XMLHttpRequest();
                var url;
                if (tipo == "escola") {
                    url = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:escola:nome,dim:escola:id&filters=dim:cidade:id==" + municipio;
                } else {
                    url = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:es:instituicao:nome,dim:es:instituicao:id&filters=dim:cidade:id==" + municipio;
                }

                xmlRequest.open("GET", url, false);
                xmlRequest.send(null);
                if (xmlRequest.readyState === 4) {
                    listarInstituicoes(JSON.parse(xmlRequest.response), tipo);
                }
            }
        }
    }
}

/**
 * Recupera a lista de instituições da resposta da base de dados
 * @param response resposta da base de dados
 * @param tipo tipo de instituições recuperadas
 */
function listarInstituicoes(response, tipo) {
    limparArray(instituicoes);
    if (response) {
        if (tipo == "ies") {
            for (var i in response) {
                instituicoes.push(new Instituicao(response[i]["dim:es:instituicao:id"], response[i]["dim:es:instituicao:nome"], tipo));
            }
        } else {
            for (var i in response) {
                instituicoes.push(new Instituicao(response[i]["dim:escola:id"], response[i]["dim:escola:nome"], tipo));
            }
        }
    }
    console.log(instituicoes);
}

/**
 * Define o comportamento ao mudar o item da meta
 */
function itemMetaMudado() {
    preloader(1);
    //TODO: Limpar a lista do ranking da interface
    //TODO: recalcular as metas para cada instituição da lista
    //TODO: reordenar a lista
    var listaMetas = document.getElementById("selecionar_meta");


    if (listaMetas.options[listaMetas.selectedIndex].value > 0){
        mostrarRanking(instituicoes, 1);
        preloader(2);
    }else{
        preloader(0);
    }

}

/**
 * Deixa ou não o preloader e a lista de resultados visível
 * @param status tipo de ativação do preloader e lista: 0-nenhum  1-apenas preloader  2-apenas lista  3-ambos
 */
function preloader(status) {
    var preloader = document.getElementById("preloader");
    var listaResultado = document.getElementById("resultado");

    switch (status) {
        case 0:
            //nenhum aparece
            preloader.style.display = 'none';
            listaResultado.style.display = 'none';
            break;
        case 1:
            //apenas preloader
            preloader.style.display = 'block';
            listaResultado.style.display = 'none';
            break;
        case 2:
            //apenas lista
            preloader.style.display = 'none';
            listaResultado.style.display = 'block';
            break;
        case 3:
            //ambos
            preloader.style.display = 'block';
            listaResultado.style.display = 'block';
            break;
    }
}

/**
 * Formata o nome da cidade para tirar  o \t e deixar as letras iniciais maiusculas
 * @param cidade string a ser formatada
 * @returns {*|boolean|Promise<Response|undefined>|RegExpMatchArray}
 */
function formatarCidade(cidade) {
    if (cidade) {
        var wordsToIgnore = ["das", "dos", "da", "do", "de", "dalla"];
        var minLenght = 3;
        var cidadeNova = "";

        cidade = cidade.toLowerCase();
        cidade = cidade.replace(/\t/g, ' ');
        cidade = getWords(cidade);
        for (var i in cidade) {
            if (wordsToIgnore.indexOf(cidade[i]) == -1 && cidade[i].length > minLenght) {
                cidade[i] = cidade[i].charAt(0).toUpperCase() + cidade[i].slice(1);
            }
            cidadeNova += cidade[i] + " ";
        }
        cidade = cidadeNova;
    }
    return cidade;
}

/**
 * Retorna um vetor de palavras existentes em uma frase
 * @param frase
 * @returns {*|boolean|Promise<Response | undefined>|RegExpMatchArray}
 */
function getWords(frase) {
    return frase.match(/\S+\s*/g);
}

//TODO: função para recuperar as de métricas de cada instituição
//TODO: fazer função para rankerar/ordenar as instituições

/**
 * Monta uma lista na interface com as instituições recebidas
 * @param instituicoes lista de instituições já osrdenadas de acordo com a meta requerida
 * @param idMeta número da meta a ser exibida no rankink
 */
function mostrarRanking(instituicoes, idMeta) {
    if (instituicoes){
        var lista = document.getElementById("resultado-list");

        if (instituicoes.length > 0){
            for (var i in instituicoes){
                var li = document.createElement('li');
                var span = document.createElement('span');

                li.setAttribute("class", "list-group-item list-group-item-action d-flex justify-content-between align-items-center");
                span.setAttribute('class', "badge badge-primary badge-pill");
                li.innerText = parseInt(i) + 1 + ". " + instituicoes[i].nome;

                for (var j in instituicoes[i].metas){
                    if (instituicoes[i].metas[j].id === idMeta){
                        span.innerText = instituicoes[i].metas[j].nota;
                        break;
                    }
                }
                li.appendChild(span);
                lista.appendChild(li);
            }
        }else{
            //mostrar mensagem que nenhuma instituição foi recuperada?
            var li = document.createElement('li');
            var span = document.createElement('span');

            li.setAttribute("class", "list-group-item list-group-item-action d-flex justify-content-between align-items-center");
            span.setAttribute('class', "badge badge-primary badge-pill");

            li.innerText = "Nenhuma instituição foi recuperada";
            span.innerText = '!';

            li.appendChild(span);
            lista.appendChild(li);
        }
    }
}