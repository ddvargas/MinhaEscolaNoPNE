var escolaID;
var instituicao = new Object();

//setar valores iniciais para a instituição
instituicao.situacao = "Desconhecida pelo sistema.";
instituicao.estado = "Desconhecido pelo sistema.";
instituicao.localidade = "Desconhecida pelo sistema.";
instituicao.nome = "Desconhecido pelo sistema.";
instituicao.eja = "Desconhecido pelo sistema.";
instituicao.educProf = "Desconhecido pelo sistema.";
instituicao.projovem = "Desconhecido pelo sistema.";


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
    switch (tipo) {
        case 1:
            //ESCOLA
            break;
        case 2:
            //IES
            //TODO: preencher dados da IES na interface
            break;
    }
}

/**
 * Recupera e monta o objeto instituição como sendo uma escola de ensino básico
 * @param id identificador único da escola no banco
 */
function getDadosEscola(id) {
    getNome(id, 1);
    getLocalidade(id, 1);
    getEndereco(id, 1);
    getSituacaoEscola(id);
    getEtapa(id);
}

/**
 * Consulta a API para a recuperação do eja na escola
 * @param id identificador único da escola.
 */
function getEtapa(id) {
    var link = "https://biod.c3sl.ufpr.br/api/v1/data?dimensions=dim:turma:etapa:ensino&metrics&filters=dim:escola:censo:ano==2017;dim:escola:id==" + id;fetch(link)
        .then(response => {
            return response.json();
        })
        .then(data => {
            recuperarEtapas(data);
        });
}

/**
 * Recupera as etapas oferecidas da escola.
 * @param data dados recuperados da consulta a API.
 */
function recuperarEtapas(data) {
    instituicao.series = "";
    for (var i in data){
        var etapa = data[i]["dim:turma:etapa:ensino"];
        switch (etapa) {
            case 1: //Educação infantil - creche
                instituicao.series += " Creche, ";
                break;
            case 2:  //2 - Educação Infantil - Pré-escola
                instituicao.series += " Educação Infantil,";
                break;
            case 3: //3 - Educação Infantil - Unificada
                instituicao.series += " Educação Infantil (Unificada),";
                break;
            case 56: //56 - Educação Infantil e Ensino Fundamental (8 e 9 anos) Multietapa
                instituicao.series += " Educação Infantil e Ensino Fundamental (8 e 9 anos) (Multietapa),";
                break;
            case 4: //4 - Ensino Fundamental de 8 anos - 1ª Série
                instituicao.series += " 1ª série EF de 8 anos,";
                break;
            case 5: //5 - Ensino Fundamental de 8 anos - 2ª Série
                instituicao.series += " 2ª série EF de 8 anos,";
                break;
            case 6: //6 - Ensino Fundamental de 8 anos - 3ª Série
                instituicao.series += " 3ª série EF de 8 anos,";
                break;
            case 7: //7 - Ensino Fundamental de 8 anos - 4ª Série
                instituicao.series += " 4ª série EF de 8 anos,";
                break;
            case 8: //8 - Ensino Fundamental de 8 anos - 5ª Série
                instituicao.series += " 5ª série EF de 8 anos,";
                break;
            case 9: //9 - Ensino Fundamental de 8 anos - 6ª Série
                instituicao.series += " 6ª série EF de 8 anos,";
                break;
            case 10: //10 - Ensino Fundamental de 8 anos - 7ª Série
                instituicao.series += " 7ª série EF de 8 anos,";
                break;
            case 11: //11 - Ensino Fundamental de 8 anos - 8ª Série
                instituicao.series += " 8ª série EF de 8 anos,";
                break;
            case 12: //12 - Ensino Fundamental de 8 anos - Multi
                instituicao.series += " Ensino Fundamental de 8 anos (Multi),";
                break;
            case 13: //13 - Ensino Fundamental de 8 anos - Correção de Fluxo
                instituicao.series += " Ensino Fundamental de 8 anos (Correção de Fluxo),";
                break;
            case 14: //14 - Ensino Fundamental de 9 anos - 1º Ano
                instituicao.series += " 1º ano Ensino Fundamental de 9 anos,";
                break;
            case 15: //15 - Ensino Fundamental de 9 anos - 2º Ano
                instituicao.series += " 2º ano Ensino Fundamental de 9 anos,";
                break;
            case 16: // 16 - Ensino Fundamental de 9 anos - 3º Ano
                instituicao.series += " 3º ano Ensino Fundamental de 9 anos,";
                break;
            case 17: //17 - Ensino Fundamental de 9 anos - 4º Ano
                instituicao.series += " 4º ano Ensino Fundamental de 9 anos,";
                break;
            case 18: //18 - Ensino Fundamental de 9 anos - 5º Ano
                instituicao.series += " 5º ano Ensino Fundamental de 9 anos,";
                break;
            case 19: //19 - Ensino Fundamental de 9 anos - 6º Ano
                instituicao.series += " 6º ano Ensino Fundamental de 9 anos,";
                break;
            case 20: //20 - Ensino Fundamental de 9 anos - 7º Ano
                instituicao.series += " 7º ano Ensino Fundamental de 9 anos,";
                break;
            case 21: //21 - Ensino Fundamental de 9 anos - 8º Ano
                instituicao.series += " 8º ano Ensino Fundamental de 9 anos,";
                break;
            case 41: //41 - Ensino Fundamental de 9 anos - 9º Ano
                instituicao.series += " 9º ano Ensino Fundamental de 9 anos,";
                break;
            case 22: // 22 - Ensino Fundamental de 9 anos - Multi
                instituicao.series += " Ensino Fundamental de 9 anos (Multi)";
                break;
            case  23: //23 - Ensino Fundamental de 9 anos - Correção de Fluxo
                instituicao.series += " Ensino Fundamental de 9 anos (Multi)";
                break;
            case 24: //24 - Ensino Fundamental de 8 e 9 anos - Multi 8 e 9 anos
                instituicao.series += " Ensino Fundamental de 8 e 9 anos (Multi 8 e 9 anos)";
                break;
            case 25: //25 - Ensino Médio - 1ª Série
                instituicao.series += " Ensino Médio - 1ª série";
                break;
            case 26: //26 - Ensino Médio - 2ª Série
                instituicao.series += " Ensino Médio - 2ª série";
                break;
            case 27: //27 - Ensino Médio - 3ª Série
                instituicao.series += " Ensino Médio - 3ª série";
                break;
            case 28: //28 - Ensino Médio - 4ª Série
                instituicao.series += " Ensino Médio - 4ª série";
                break;
            case 29: //29 - Ensino Médio - Não Seriada
                instituicao.series += " Ensino Médio (Não seriado)";
                break;
            case 30: //30 - Curso Técnico Integrado (Ensino Médio Integrado) 1ª Série
                instituicao.series += " 1ª Série - Curso Técnico Integrado (Ensino Médio Integrado),";
                instituicao.educProf = "Sim.";
                break;
            case 31: //31 - Curso Técnico Integrado (Ensino Médio Integrado) 2ª Série
                instituicao.series += " 2ª Série - Curso Técnico Integrado (Ensino Médio Integrado),";
                instituicao.educProf = "Sim.";
                break;
            case 32: //32 - Curso Técnico Integrado (Ensino Médio Integrado) 3ª Série
                instituicao.series += " 3ª Série - Curso Técnico Integrado (Ensino Médio Integrado),";
                instituicao.educProf = "Sim.";
                break;
            case 33: //33 - Curso Técnico Integrado (Ensino Médio Integrado) 4ª Série
                instituicao.series += " 4ª Série - Curso Técnico Integrado (Ensino Médio Integrado),";
                instituicao.educProf = "Sim.";
                break;
            case 34: //34 - Curso Técnico Integrado (Ensino Médio Integrado) Não Seriada
                instituicao.series += " Curso Técnico Integrado (Ensino Médio Integrado) (Não Seriado),";
                instituicao.educProf = "Sim.";
                break;
            case 35: //35 - Ensino Médio - Normal/Magistério 1ª Série
                instituicao.series += " 1ª Série Ensino Médio - Normal/Magistério,";
                break;
            case 36:// 36 - Ensino Médio - Normal/Magistério 2ª Série
                instituicao.series += " 2ª Série Ensino Médio - Normal/Magistério,";
                break;
            case 37: //37 - Ensino Médio - Normal/Magistério 3ª Série
                instituicao.series += " 3ª Série Ensino Médio - Normal/Magistério,";
                break;
            case 38: //38 - Ensino Médio - Normal/Magistério 4ª Série
                instituicao.series += " 4ª Série Ensino Médio - Normal/Magistério,";
                break;
            case 39: //39 - Curso Técnico - Concomitante
                instituicao.series += " Curso Técnico - Concomitante,";
                instituicao.educProf = "Sim.";
                break;
            case 40: //40 - Curso Técnico - Subsequente
                instituicao.series += " Curso Técnico - Subsequente,";
                instituicao.educProf = "Sim.";
                break;
            case 64: //64 - Curso Técnico Misto (Concomitante e Subsequente)
                instituicao.series += " Curso Técnico Misto (Concomitante e Subsequente),";
                instituicao.educProf = "Sim.";
                break;
            case 68: //68 - Curso FIC Concomitante
                instituicao.series += " Curso FIC Concomitante,";
                break;
            case 65: //65 - EJA - Ensino Fundamental - Projovem Urbano
                instituicao.series += " EJA - Ensino Fundamental - Projovem Urbano,";
                instituicao.eja = "Sim.";
                instituicao.projovem = "Sim.";
                break;
            case 67: //67 - Curso FIC integrado na modalidade EJA  - Nível Médio
                instituicao.series += " Curso FIC integrado na modalidade EJA  - Nível Médio,";
                instituicao.eja = "Sim.";
                break;
            case 69: //69 - EJA - Ensino Fundamental - Anos Iniciais
                instituicao.series += " EJA - Ensino Fundamental - Anos Iniciais,";
                instituicao.eja = "Sim.";
                break;
            case 70: //70 - EJA - Ensino Fundamental - Anos Finais
                instituicao.series += " EJA - Ensino Fundamental - Anos Finais,";
                instituicao.eja = "Sim.";
                break;
            case 71: //71 - EJA - Ensino Médio
                instituicao.series += " EJA - Ensino Médio,";
                instituicao.eja = "Sim.";
                break;
            case 72: //72 - EJA - Ensino Fundamental - Anos Iniciais e Anos Finais
                instituicao.series += " EJA - Ensino Fundamental - Anos Iniciais e Anos Finais,";
                instituicao.eja = "Sim.";
                break;
            case 73: //73 - Curso FIC integrado na modalidade EJA - Nível Fundamental (EJA integrada à Educação Profissional de Nível Fundamental)
                instituicao.series += " Curso FIC integrado na modalidade EJA - Nível Fundamental (EJA integrada à Educação Profissional de Nível Fundamental),";
                instituicao.eja = "Sim.";
                instituicao.educProf = "Sim.";
                break;
            case 74: //74 - Curso Técnico Integrado na Modalidade EJA (EJA integrada à Educação Profissional de Nível Médio)
                instituicao.series += " Curso Técnico Integrado na Modalidade EJA (EJA integrada à Educação Profissional de Nível Médio),";
                instituicao.eja = "Sim.";
                instituicao.educProf = "Sim.";
                break;
        }
    }

    console.log("length: " + instituicao.series.length);
    if (instituicao.series == ""){
        instituicao.series = "Desconhecido pelo sistema.";
    }else {
        instituicao.series[instituicao.series.length-3] = ".";
    }
    if (instituicao.projovem == "Desconhecido pelo sistema."){
        instituicao.projovem = "Não.";
    }
    if (instituicao.eja == "Desconhecido pelo sistema."){
        instituicao.eja = "Não.";
    }
    if (instituicao.educProf == "Desconhecido pelo sistema."){
        instituicao.educProf = "Não.";
    }

    var elementoSeries = document.createElement('p');
    var elementoEja = document.createElement('p');
    var elementoProjovem = document.createElement('p');
    var elementoEducProf = document.createElement('p');
    var container = document.getElementById("infos_instituicao");

    elementoSeries.setAttribute("class", "card-text");
    elementoEja.setAttribute("class", "card-text");
    elementoProjovem.setAttribute("class", "card-text");
    elementoEducProf.setAttribute("class", "card-text");

    elementoEducProf.innerHTML = "<strong>Educação Profissional: </strong>" + instituicao.educProf;
    elementoProjovem.innerHTML = "<strong>Projovem: </strong>" + instituicao.projovem;
    elementoSeries.innerHTML = "<strong>Séries oferecidas: </strong>" + instituicao.series;
    elementoEja.innerHTML = "<strong>EJA: </strong>" + instituicao.eja;

    container.appendChild(elementoSeries);
    container.appendChild(elementoEja);
    container.appendChild(elementoProjovem);
    container.appendChild(elementoEducProf);
}


/**
 * Recupera a siatuação da escola no banco, pelo seu ID
 * @param id identificador único da escola no banco
 */
function getSituacaoEscola(id) {
    var link = "https://biod.c3sl.ufpr.br/api/v1/data?dimensions=dim:escola:situacao:funcionamento&metrics&filters=dim:escola:censo:ano==2017;dim:escola:id==" + id;
    fetch(link)
        .then(response => {
            return response.json();
        })
        .then(data => {
            recuperaSituacaoEscola(data);
        });
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
    var elementoSituacao = document.createElement('p');
    var container = document.getElementById("infos_instituicao");
    elementoSituacao.setAttribute("class", "card-text");
    elementoSituacao.innerHTML = "<strong>Situação: </strong>" + instituicao.situacao;
    container.appendChild(elementoSituacao);
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
            var link = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:estado:nome,dim:cidade:nome&filters=dim:escola:id==" + id;
            fetch(link)
                .then(response => {
                    return response.json();
                })
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
    instituicao.estado = formatarCidade(data[0]["dim:cidade:nome"])  + " - " + data[0]["dim:estado:nome"];
    var elementoLocalizacao = document.createElement('p');
    var container = document.getElementById("infos_instituicao");
    elementoLocalizacao.setAttribute("class", "card-text");
    elementoLocalizacao.innerHTML = "<strong>Endereço: </strong>" + instituicao.estado;
    container.appendChild(elementoLocalizacao);
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
            cidadeNova += cidade[i] + " ";
        }
        cidade = cidadeNova;
    }
    return cidade;
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
                .then(result => {
                    return result.json();
                })
                .then(data => {
                    recuperarLocalidade(data, tipo);
                });
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

    var container = document.getElementById("infos_instituicao");
    var elementoLocalidade = document.createElement('p');
    elementoLocalidade.setAttribute("class", "card-text");
    elementoLocalidade.innerHTML = "<strong>Localidade: </strong>" + instituicao.localidade;
    container.appendChild(elementoLocalidade);
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
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    recuperarNome(data, tipo);
                });
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
            var nomeHTML = document.getElementById("nome_escola");
            nomeHTML.innerText = instituicao.nome;
            break;
        case 2:
            //ies
            //TODO: recuperar nome da IES
            break;
    }
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
            param_value = params[1].substring(params[1].indexOf('=') + 1)
        }
    }
    if (param_value) {
        return param_value;
    } else {
        return undefined;
    }
}