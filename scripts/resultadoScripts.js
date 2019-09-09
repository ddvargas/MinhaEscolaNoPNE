var escolaID;
var instituicao = new Object();
window.onload = function () {
    //Recuperar id da instituição
    escolaID = getParameters("escolaID");
    var tipo = 1;
    //var tipo = getParameters("tipo");
    //testar o tipo e montar objeto de acordo com o tipo
    switch (tipo) {
        case 1:
            //escola
            getDadosEscola(escolaID);
            break;
        case 2:
            //IES
            break;
        default:
            //Erro
    }

    preencherDadosInstituicao(tipo);
    console.log(instituicao);
}


function preencherDadosInstituicao(tipo) {

}

/**
 * Recupera e monta o objeto instituição como sendo uma escola de ensino básico
 * @param id identificador único da escola no banco
 */
function getDadosEscola(id) {
    getNome(id, 1);
    //getSeriesOferecidas(id);
    getLocalidade(id, 1);
    getEndereco(id, 1);
    getSituacaoEscola(id);
}

/**
 * Recupera a siatuação da escola no banco, pelo seu ID
 * @param id identificador único da escola no banco
 */
function getSituacaoEscola(id) {
    var link = "https://biod.c3sl.ufpr.br/api/v1/data?dimensions=dim:escola:situacao:funcionamento&metrics&filters=dim:escola:censo:ano==2017;dim:escola:id==" + id;
    fetch(link)
        .then(response => {return response.json();})
        .then(data => {recuperaSituacaoEscola(data);});
}

/**
 * Recupera a situação dos dados retornados da API e padroniza-os
 * @param data dados retornados da API
 */
function recuperaSituacaoEscola(data) {
    var situacao = data[0]["dim:escola:situacao:funcionamento"];
    switch (situacao) {
        case 1:
            //em atividade
            instituicao.situacao = "Em atividade";
            break;
        case 2:
            //Paralisada
            instituicao.situacao = "Paralisada";
            break;
        case 3:
            //Extinta no ano do censo
            instituicao.situacao = "Extinta no ano do censo";
            break;
        case 4:
            //Extinta em anos anteriores
            instituicao.situacao = "Extinta em anos anteriores ao censo";
            break;
        default:
            //Desconhecida pelo sistema
            instituicao.situacao = "Desconhecida pelo sistema";

    }
}

/**
 * Recupera o endereço da instituição pelo seu ID
 * @param id identificador único da escola no banco
 * @param tipo tipo de instituição: escola (1) e ies (2)
 */
function getEndereco(id, tipo) {
    switch (tipo) {
        case 1:
            //escola
            var link = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:estado:nome,dim:cidade:id&filters=dim:escola:id==" + id;
            fetch(link)
                .then(response => {return response.json();})
                .then(data => recuperarEndereco(data, tipo));
            break;
        case 2:
            //IES
            break;
    }
}

/**
 * Recupera o endereço retornado dos dados do banco
 * @param data dados retornados
 */
function recuperarEndereco(data) {
    instituicao.estado = data[0]["dim:estado:nome"];
    var idMuni = data[0]["dim:cidade:id"];
    console.log("Id municipio: " + idMuni);
    //TODO: recuperar no IBGE o nome do município
}

/**
 * Consulta a localidade pelo id
 * @param id identificador único da instituição no banco
 * @param tipo se instituição de ensino básico (1) ou de ensino Superior (2)
 */
function getLocalidade(id, tipo) {
    switch (tipo) {
        case 1:
            //escola
            var link = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:escola:zona:residencial&filters=dim:escola:censo:ano==2017;dim:escola:id==" + id;
            fetch(link)
                .then(result => {return result.json();})
                .then(data => {recuperarLocalidade(data, tipo);});
            break;
        case 2:
            //ies
            //TODO: recuperar localidade da ies na API
    }
}

/**
 * Recebe os dados retornados e recupera a zona residencial
 * @param data dados retornados da consulta
 * @param tipo tipo de instituição escola(1) ou IES (2)
 */
function recuperarLocalidade(data, tipo) {
    var local;
    switch (tipo) {
        case 1:
            //escola
            local = data[0]["dim:escola:zona:residencial"];
            break;
        case 2:
            //IES
            //TODO: recuperar nome da IES
            break;
    }

    switch (local) {
        case 1:
            instituicao.localidade = "Urbana";
            break;
        case 2:
            instituicao.localidade = "Rural";
            break;
        default:
            instituicao.localidade = "Desconhecida pelo sistema";
    }
}

/**
 * Recupera o nome da instituição de ensino pelo seu ID no banco, de acordo com seu tipo.
 * @param id identificador único da instituição no banco
 * @param tipo se instituição de ensino básico (1) ou de ensino Superior (2)
 */
function getNome(id, tipo) {
    switch (tipo) {
        case 1:
            //recuperar nome da escola
            var link = "https://biod.c3sl.ufpr.br/api/v1/data?dimensions=dim:escola:nome&metrics&filters=dim:escola:censo:ano==2017;dim:escola:id==" + id;
            fetch(link)
                .then(response => {return response.json();})
                .then(data => {recuperarNome(data, tipo);});
            break;
        case 2:
            //recuperar nome da IES
            //TODO: recuperar nome da IES na API
            break;
    }
}

/**
 * Recebe os dados da requisição e extrai o nome da instituição pelo tipo.
 * @param data dados retornados da consulta.
 * @param tipo se instituição de ensino básico (1) ou de ensino Superior (2)
 */
function recuperarNome(data, tipo) {
    switch (tipo) {
        case 1:
            //escola
            instituicao.nome = data[0]["dim:escola:nome"];
            break;
        case 2:
            //ies
            //TODO: recuperar nome da IES
            break;
    }
}

function getSeriesOferecidas(id) {
    //TODO: recuperar as séries oferecidas na escola
}

/**
 * Função para recuperar argumentos passados como parâmetro na página
 * @param parametro nome do parametro que se quer recuperar
 * @returns {value|undefined}
 */
function getParameters(parametro) {
    var loc = window.location.href;
    var param_value = false;
    var params = loc.split("?");
    for (var i = 0; i <= params.length; i++) {
        var param_name = params[1].substring(0, params[1].indexOf('='));
        if (param_name === parametro) {
            param_value = params[1].substring(params[1].indexOf('=')+1)
        }
    }
    if (param_value) {
        return param_value;
    } else {
        return undefined;
    }
}