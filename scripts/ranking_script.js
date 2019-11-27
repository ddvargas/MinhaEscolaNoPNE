var instituicoes = [];

/**
 * Definição da estrutura de uma instituição
 * @param idInstituicao id unico retornado da base de dados
 * @param nomeInstituicao nome retornado da base de dados
 * @param tipo tipo de instituição (ies/escola)
 * @constructor
 */
function Instituicao(idInstituicao, nomeInstituicao, idCidade, tipo) {
    this.id = idInstituicao;
    this.nome = nomeInstituicao;
    this.idCidade = idCidade;
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
                    listarInstituicoes(JSON.parse(xmlRequest.response), tipo, municipio);
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
function listarInstituicoes(response, tipo, municipio) {
    limparArray(instituicoes);
    if (response) {
        if (tipo == "ies") {
            for (var i in response) {
                instituicoes.push(new Instituicao(response[i]["dim:es:instituicao:id"], response[i]["dim:es:instituicao:nome"], municipio, tipo));
            }
        } else {
            for (var i in response) {
                instituicoes.push(new Instituicao(response[i]["dim:escola:id"], response[i]["dim:escola:nome"], municipio, tipo));
            }
        }
    }

    // função que remove duplicados do vetor instituições
    // não parametrizada
    removeDuplicados();

    console.log(instituicoes);
}

// remove itens duplicados de vetores de objeto com base em um atributo escolhido como índice
// retirado de https://www.geeksforgeeks.org/how-to-remove-duplicates-from-an-array-of-objects-using-javascript/

function removeDuplicados() {

    //  vetor temporário
    var instituicoes2 = [];
    instituicoes2 = instituicoes;

    // objeto vazio
    var uniqueObject = {};

    // Loop for the array elements
    for (var i in instituicoes2) {

        // obtêm id(instituição)
        objTitle = instituicoes2[i]['id'];

        // utiliza id como índice
        uniqueObject[objTitle] = instituicoes2[i];
    }

    // zerar vetor original
    instituicoes = [];

    // laço para armazenar valores únicos
    for (i in uniqueObject) {
        instituicoes.push(uniqueObject[i]);
    }

}


// calcula nota da escola com base na meta 1.1 e 1.2
function calcularNotaEscolaMeta11(idEscola, municipio, index) {

    // links para recuperar informações
    var linkMeta11a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=dim:escola:id" +
        "&filters=dim:matricula:idade==4,dim:matricula:idade==5;dim:matricula:censo:ano==2017;dim:escola:id==" + idEscola;
    var linkMeta11b = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + municipio + "/v/93/C287/6562"; // 5 anos
    var linkMeta11c = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + municipio + "/v/93/C287/6561"; // 4 anos
    var linkMeta12a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=&dimensions=dim:escola:id,dim:matricula:id&" +
        "filters=dim:matricula:idade==0,dim:matricula:idade==1,dim:matricula:idade==2,dim:matricula:idade==3;" +
        "dim:escola:id==" + idEscola;
    var linkMeta12b = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + municipio + "/v/93/C287/93070";

    // variáveis temporárias
    var meta11a;
    var meta11b;
    var meta11c;
    var meta12a;
    var meta12b;

    var xmlRequest = new XMLHttpRequest();
    var data;

    // recupação de dados
    xmlRequest.open("GET", linkMeta11a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        data = (JSON.parse(xmlRequest.response));
        if (data[0] !== undefined)  {
            meta11a = parseInt(data[0]["met:count:matricula:id"]);
            //console.log("Ranking Meta11a: " + meta11a);
        }
    }

    xmlRequest.open("GET", linkMeta11b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        data = (JSON.parse(xmlRequest.response));
        if (data[1] !== undefined){
            meta11b = parseInt(data[1]["V"]);
            //console.log("Ranking Meta11b: " + meta11b);
        }
    }

    xmlRequest.open("GET", linkMeta11c, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        data = (JSON.parse(xmlRequest.response));
        if (data[1] !== undefined){
            meta11c = parseInt(data[1]["V"]);
            //console.log("Ranking Meta11c: " + meta11c);
        }
    }

    xmlRequest.open("GET", linkMeta12a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        meta12a = (JSON.parse(xmlRequest.response));
        if (data[0] !== undefined){
            meta12a = parseInt(data[0]["met:count:matricula:id"]);
            //console.log("Ranking Meta 1.2 a: " + meta12a);
        }
    }

    xmlRequest.open("GET", linkMeta12b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        meta12b = (JSON.parse(xmlRequest.response));
        if (data[1] !== undefined) {
            meta12b = parseInt(data[1]["V"]);
            //console.log("Ranking Meta12b: " + meta12b);
        }
    }

    // definição da nota pela métrica 1.1
    if (meta11a !== undefined) {
        instituicoes[index].nota = (meta11a / (meta11b + meta11c)) * 100;
    } else {
        instituicoes[index].nota = 0;
    }

    //console.log(instituicoes[index].nome + " Nota = " + instituicoes[index].nota);

}

// ordena em ordem crescente
// função definida para aplicação do método sort no vetor instituições
function ordenarNota(a, b) {
    return b.nota - a.nota;
}

/**
 * Define o comportamento ao mudar o item da meta
 */
function itemMetaMudado() {
    preloader(1);
    //TODO: Limpar a lista do ranking da interface
    limparListaRanking();
    //TODO: recalcular as metas para cada instituição da lista

    for (var i in instituicoes) {
        calcularNotaEscolaMeta11(instituicoes[i].id, instituicoes[i].idCidade, i);
    }

    // ordenação do vetor conforme nota da meta
    instituicoes.sort(ordenarNota);

    // imprime vetor no console
    /* for (var i in instituicoes) {
        console.log(instituicoes[i].nome + " Nota = " + instituicoes[i].nota);
    } */


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
        var coberturaCidade = 0; //armazena percentual total de abrangencia para o município
        var listaDiv = document.getElementById("resultado");
        var lista = document.createElement('ul');
        lista.setAttribute("class", "list-group");
        lista.setAttribute("id", "resultado-list");

        if (instituicoes.length > 0){
            for (var i in instituicoes){
                var li = document.createElement('li');
                var span = document.createElement('span');

                li.setAttribute("class", "list-group-item list-group-item-action d-flex justify-content-between align-items-center");
                span.setAttribute('class', "badge badge-primary badge-pill");

                // raking com percentual da meta
                if (instituicoes[i] !== undefined) {
                    // exibe somente escolas com dados para a métrica escolhida
                    if (instituicoes[i].nota !== 0) {
                        li.innerText = parseInt(i) + 1 + " -   " + instituicoes[i].nota.toFixed(2) + "%   - "+ instituicoes[i].nome;
                        coberturaCidade += instituicoes[i].nota;
                    }
                } else {
                    li.innerText = parseInt(i) + 1 + ". " + instituicoes[i].nome;
                }

                // linha antiga - somente escola
                // li.innerText = parseInt(i) + 1 + ". " + instituicoes[i].nome;

                for (var j in instituicoes[i].metas){
                    if (instituicoes[i].metas[j].id === idMeta){
                        span.innerText = instituicoes[i].metas[j].nota;
                        break;
                    }
                }

                // não linhas de instituições que não correspondem a meta selecionada
                if (instituicoes[i].nota !== 0) {
                    li.appendChild(span);
                    lista.appendChild(li);
                }

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

        //  exibe cobertura de crianças matriculadas em função do total de crianças da cidade
        li.innerText = "Total = " + coberturaCidade.toFixed(2) + "%  de cobertura escolar"
        li.appendChild(span);
        lista.appendChild(li);

        listaDiv.appendChild(lista);
    }
}

/**
 * Remove todos os elementos da lista de ranking sendo mostrada na inteface
 */
function limparListaRanking() {
    var lista = document.getElementById("resultado-list");
    lista.remove();
}