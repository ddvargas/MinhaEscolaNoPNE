var escolaID;
var instituicao = new Object();


var meta11a = 0;
var meta11b = 0;
var meta11c = 0;
var meta12a = 0;
var meta12b = 0;
var meta21a = 0;
var meta21b = 0;
var meta21c = 0;
var meta21d = 0;
var meta22a = 0;
var meta22b = 0;
var meta31a = 0;
var meta31b = 0;
var meta32a = 0;
var meta32b = 0;
var meta41a = 0;
var meta41b = 0;
var meta91b = 0;
var meta91c = 0;


//setar valores iniciais para a instituição
instituicao.situacao = "Desconhecida pelo sistema.";
instituicao.estado = "Desconhecido pelo sistema.";
instituicao.municipio = 0;
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
    getEndereco(id, 1);
    getNome(id, 1);
    getLocalidade(id, 1);
    getSituacaoEscola(id);
    getEtapa(id);
}

/**
 * Consulta a API para a recuperação do eja na escola
 * @param id identificador único da escola.
 */
function getEtapa(id) {
    var link = "https://biod.c3sl.ufpr.br/api/v1/data?dimensions=dim:turma:etapa:ensino&metrics&filters=dim:escola:" +
        "censo:ano==2017;dim:escola:id==" + id;
    fetch(link)
        .then(response => {
            return response.json();
        })
        .then(data => {
            recuperarEtapas(data);
        })
        .then(recuperarMetricas);

}

/**
 * Recupera as etapas oferecidas da escola.
 * @param data dados recuperados da consulta a API.
 */
function recuperarEtapas(data) {
    instituicao.series = "";
    for (var i in data) {
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
    if (instituicao.series == "") {
        instituicao.series = "Desconhecido pelo sistema.";
    } else {
        instituicao.series[instituicao.series.length - 3] = ".";
    }
    if (instituicao.projovem == "Desconhecido pelo sistema.") {
        instituicao.projovem = "Não.";
    }
    if (instituicao.eja == "Desconhecido pelo sistema.") {
        instituicao.eja = "Não.";
    }
    if (instituicao.educProf == "Desconhecido pelo sistema.") {
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
            var link = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:estado:nome,dim:cidade:nome,dim:cidade:id&filters=dim:escola:id==" + id;
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
    instituicao.estado = formatarCidade(data[0]["dim:cidade:nome"]) + " - " + data[0]["dim:estado:nome"];
    instituicao.municipio = data[0]["dim:cidade:id"];
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


function recuperarMetricas() {
    var linkMeta11a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=dim:escola:id" +
        "&filters=dim:matricula:idade==4,dim:matricula:idade==5;dim:matricula:censo:ano==2017;dim:escola:id==" + escolaID;
    var linkMeta11b = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93/C287/6562"; // 5 anos
    var linkMeta11c = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93/C287/6561"; // 4 anos
    var linkMeta12a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=&dimensions=dim:escola:id,dim:matricula:id&" +
        "filters=dim:matricula:idade==0,dim:matricula:idade==1,dim:matricula:idade==2,dim:matricula:idade==3;" +
        "dim:escola:id==" + escolaID;
    var linkMeta12b = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93/C287/93070";
    var linkMeta21a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics&dimensions=dim:matricula:id&filters=dim:matricula:" +
        "idade>6;dim:matricula:idade<14;dim:escola:id==" + escolaID;
    var linkMeta21b = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93//C287/93085"; // 10 a 14 anos
    var linkMeta21c = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93//C287/93084"; // 5 a 9 anos
    var linkMeta21d = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93//C287/6562"; // 5 anos
    var linkMeta22a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=&filters=dim:" +
        "matricula:etapa:ensino<11,dim:matricula:etapa:ensino==14,dim:matricula:etapa:ensino==15,dim:matricula:etapa:ensino==16," +
        "dim:matricula:etapa:ensino==17,dim:matricula:etapa:ensino==18,dim:matricula:etapa:ensino==19,dim:matricula:etapa:ensino==20," +
        "dim:matricula:etapa:ensino==21,dim:matricula:etapa:ensino==41;dim:matricula:idade>16;dim:escola:id==" + escolaID;
    var linkMeta22b = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=&" +
        "filters=dim:matricula:idade>16;dim:escola:id==" + escolaID;
    var linkMeta31a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=&" +
        "filters=dim:matricula:idade==15,dim:matricula:idade==16,dim:matricula:idade==17;dim:escola:id==" +
        escolaID + ";dim:matricula:censo:ano==2017;dim:turma:etapa:ensino==25,dim:turma:etapa:ensino==26," +
        "dim:turma:etapa:ensino==27,dim:turma:etapa:ensino==28";
    var linkMeta31b = "http://api.sidra.ibge.gov.br/values/t/1378/n6/" + instituicao.municipio + "/v/93/C287/107453";
   var linkMeta32a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=&filters=dim:matricula:idade>" +
       "15;dim:matricula:idade<17;dim:matricula:censo:ano==2017;dim:turma:etapa:ensino>24;dim:turma:etapa:ensino<39;" +
       "dim:escola:id==" + escolaID;
   var linkMeta32b = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=&filters=" +
       "dim:matricula:idade>15;dim:matricula:idade<17;dim:matricula:censo:ano==2017;dim:escola:id==" + escolaID;
    var linkMeta41a = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=met:count:matricula:id&dimensions=&" +
        "filters=dim:matricula:surdo:cegueira==1,dim:matricula:surdez==1,dim:matricula:superdotado==1," +
        "dim:matricula:sindrome:rett==1,dim:matricula:sindrome:asperger==1,dim:matricula:deficiencia:multipla==1," +
        "dim:matricula:deficiencia:fisica==1,dim:matricula:deficiencia:intelectual==1,dim:matricula:deficiencia:auditiva==1;" +
        "dim:matricula:idade>4;dim:matricula:idade<16;dim:escola:id==" + escolaID;
    var linkMeta41b = "http://api.sidra.ibge.gov.br/values/t/3434/n6/" + instituicao.municipio +
        "/v/93/c134/7815/c58/1141,1142/C12081/0";
    //TODO: Adicionar links para a meta 4.2 A e B;
    //TODO: Adicionar links para a meta 5.1 A
    var linkMeta51LeituraB = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=&dimensions=dim:matricula:id&" +
        "filters=dim:escola:id==" + escolaID + ";dim:matricula:etapa:ensino==6,dim:matricula:etapa:ensino==16;" +
        "dim:matricula:censo:ano==2017";
    //TODO: Adicionar links para a meta 5.2 A
    var linkMeta52EscritaB = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=&dimensions=dim:matricula:id&" +
        "filters=dim:escola:id==" + escolaID + ";dim:matricula:etapa:ensino==6,dim:matricula:etapa:ensino==16;" +
        "dim:matricula:censo:ano==2017";
    //TODO: Adicionar links para a meta 5.3 A
    var linkMeta53MatematicaB = "https://biod.c3sl.ufpr.br/api/v1/data?metrics=&dimensions=dim:matricula:id&" +
        "filters=dim:escola:id==" + escolaID + ";dim:matricula:etapa:ensino==6,dim:matricula:etapa:ensino==16;" +
        "dim:matricula:censo:ano==2017";
    //TODO: Adicionar links meta 6
    //TODO: Adicionar links meta 7
    var linkMeta91b = "http://api.sidra.ibge.gov.br/values/t/204/n6/" + instituicao.municipio +
        "/v/157/c59/1023/c58/1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,2503";
    var linkMeta91c = "http://api.sidra.ibge.gov.br/values/t/200/n6/" + instituicao.municipio
        + "/v/93/c58/1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,6802,6803,92963,92964,92965";
    //TODO: Adicionar links meta 11

    // objeto HttpRequest
    var xmlRequest = new XMLHttpRequest();


    //Iniciar consultas, tratamento dos dados e criação dos gráficos

    // meta 1.1
    xmlRequest.open("GET", linkMeta11a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta11a(JSON.parse(xmlRequest.response));
    }

    xmlRequest.open("GET", linkMeta11b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta11b(JSON.parse(xmlRequest.response));
    }

    xmlRequest.open("GET", linkMeta11c, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta11c(JSON.parse(xmlRequest.response));
    }
    calcularDadosMeta11();
    // /meta1.1

    // meta 1.2
    xmlRequest.open("GET", linkMeta12a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta12a(JSON.parse(xmlRequest.response));
    }

    xmlRequest.open("GET", linkMeta12b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta12b(JSON.parse(xmlRequest.response));
    }
    calcularDadosMeta12();
    // /meta1.2

    // meta 2.1
    xmlRequest.open("GET", linkMeta21a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta21a(JSON.parse(xmlRequest.response));
    }

    xmlRequest.open("GET", linkMeta21b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta21b(JSON.parse(xmlRequest.response));
    }

    xmlRequest.open("GET", linkMeta21c, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta21c(JSON.parse(xmlRequest.response));
    }

    xmlRequest.open("GET", linkMeta21d, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta21d(JSON.parse(xmlRequest.response));
    }
    calcularDadosMeta21();
    // /meta2.1


    // meta 2.2
    xmlRequest.open("GET", linkMeta22a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4){
        recuperarDadosMeta22a(JSON.parse(xmlRequest.response));
    }
    xmlRequest.open("GET", linkMeta22b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4){
        recuperarDadosMeta22b(JSON.parse(xmlRequest.response));
    }
    calcularDadosMeta22();
    // /meta 2.2

    // meta 3.1
    xmlRequest.open("GET", linkMeta31a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4){
        recuperarDadosMeta31a(JSON.parse(xmlRequest.response));
    }
    xmlRequest.open("GET", linkMeta31b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4){
        recuperarDadosMeta31b(JSON.parse(xmlRequest.response));
    }
    // /meta 3.1

    // meta 3.2
    xmlRequest.open("GET", linkMeta32a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4){
        recuperarDadosMeta32a(JSON.parse(xmlRequest.response));
    }
    xmlRequest.open("GET", linkMeta32b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4){
        recuperarDadosMeta32b(JSON.parse(xmlRequest.response));
    }
    // /meta 3.2

    // meta 4.1
    xmlRequest.open("GET", linkMeta41a, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta41a(JSON.parse(xmlRequest.response));
    }
    xmlRequest.open("GET", linkMeta41b, false);
    xmlRequest.send(null);
    if (xmlRequest.readyState === 4) {
        recuperarDadosMeta41b(JSON.parse(xmlRequest.response));
    }
    // /meta 4.1



    // meta 9.1
    if (instituicao.eja != "Não.") {
        xmlRequest.open("GET", linkMeta91b, false);
        xmlRequest.send(null);
        if (xmlRequest.readyState === 4) {
            recuperarDadosMeta91b(JSON.parse(xmlRequest.response));
        }
        xmlRequest.open("GET", linkMeta91c, false);
        xmlRequest.send(null);
        if (xmlRequest.readyState === 4) {
            recuperarDadosMeta91c(JSON.parse(xmlRequest.response));
        }
    } else {
        criarGrafico(0, "pieChartMeta91");
    }
    // /meta 9.1
}

// RECUPERAR DADOS E TRATÁ-LOS
// meta 1.1
/**
 * Trata os dados retornado da consulta para a meta 1.1 a colocando nas variáveis corretas
 * @param data dados retornados da consulta
 */
function recuperarDadosMeta11a(data) {
    if (!isEmpty(data)){
        meta11a = parseInt(data[0]["met:count:matricula:id"]);
        console.log("Meta11a: " + meta11a);
    }
}
function recuperarDadosMeta11b(data) {
    if (!isEmpty(data)){
        meta11b = parseInt(data[1]["V"]);
        console.log("Meta11b: " + meta11b);
    }
}
function recuperarDadosMeta11c(data) {
    if (!isEmpty(data)){
        meta11c = parseInt(data[1]["V"]);
        console.log("Meta11c: " + meta11c);
    }
}
function calcularDadosMeta11() {
    var dadosEscola;
    dadosEscola = (meta11a / (meta11b + meta11c)) * 100;
    console.log("result11: " + dadosEscola);
    criarGrafico(dadosEscola.toFixed(2), "pieChartMeta11");
}

// /meta 1.1

// meta 1.2
/**
 * Trata os dados retornado da consulta para a meta 1.2 a colocando nas variáveis corretas
 * @param data dados retornados da consulta
 */
function recuperarDadosMeta12a(data) {
    meta12a = data.length;
    console.log("Meta12a: " + meta12a);
}
function recuperarDadosMeta12b(data) {
    meta12b = parseInt(data[1]["V"]);
    console.log("Meta12b: " + meta12b);
}
function calcularDadosMeta12() {
    var dadosEscola;
    dadosEscola = (meta12a / meta12b) * 100;
    console.log("result12: " + dadosEscola);
    criarGrafico(dadosEscola.toFixed(2), "pieChartMeta12");
}

// /meta 1.2

// meta 2.1
/**
 * Trata os dados retornado da consulta para a meta 2.1 a colocando nas variáveis corretas
 * @param data dados retornados
 */
function recuperarDadosMeta21a(data) {
    meta21a = data.length;
    console.log("Meta21a: " + meta21a);
}
function recuperarDadosMeta21b(data) {
    meta21b = parseInt(data[1]["V"]);
    console.log("Meta21b: " + meta21b);
}
function recuperarDadosMeta21c(data) {
    meta21c = parseInt(data[1]["V"]);
    console.log("Meta21c: " + meta21c);
}
function recuperarDadosMeta21d(data) {
    meta21d = parseInt(data[1]["V"]);
    console.log("Meta21d: " + meta21d);
}
function calcularDadosMeta21() {
    var dadosEscola;
    dadosEscola = (meta21a / ((meta21b + meta21c) - meta21d)) * 100;
    console.log("result21: " + dadosEscola);
    criarGrafico(dadosEscola.toFixed(2), "pieChartMeta21");
}
// /meta 2.1

// meta 2.2
function recuperarDadosMeta22a(data) {
    if (data){
        meta22a = parseInt(data[0]["met:count:matricula:id"]);
        console.log("Meta 2.2 a: " + meta22a);
    }
}
function recuperarDadosMeta22b(data) {
    if (data){
        meta22b = parseInt(data[0]["met:count:matricula:id"]);
        console.log("Meta 2.2 b: " + meta22b);
    }
}
function calcularDadosMeta22(){
    if (meta22a && meta22b){
        var dadosEscola = (meta22a/meta22b)*100;
        criarGrafico(dadosEscola.toFixed(2), "pieChartMeta22");
    }else {
        criarGrafico(0, "pieChartMeta22");
    }
}
// /meta 2.2

//meta 3.1
function recuperarDadosMeta31a(data) {
    if (data){
        meta31a = parseInt(data[0]["met:count:matricula:id"]);
        console.log("MEta 3.1 a: " + meta31a);
    }
}
function recuperarDadosMeta31b(data) {
    if (data){
        meta31b = parseInt(data[1]["V"]);
        console.log("Meta 3.1 b: " + meta31b);
    }
    if (meta31a && meta31b){
        calcularDadosMeta31();
    }else{
        criarGrafico(0, "pieChartMeta31");
    }

}
function calcularDadosMeta31(){
    var dadosEscola = (meta31a / meta31b) * 100;
    criarGrafico(dadosEscola.toFixed(2), "pieChartMeta31");
}
// /meta3.1

// meta 3.2
function recuperarDadosMeta32a(data) {
    if (data){
        meta32a = parseInt(data[0]["met:count:matricula:id"]);
        console.log("Meta 3.2 a: " + meta32a);
    }
}
function recuperarDadosMeta32b(data) {
    if (data){
        meta32b = parseInt(data[0]["met:count:matricula:id"]);
        console.log("Meta 3.2 b: " + meta32b);
        calcularDadosMeta32();
    }
}
function calcularDadosMeta32() {
    if (meta32a && meta32b){
        var dadosEscola = (meta32a / meta32b) * 100;
        criarGrafico(dadosEscola.toFixed(2), "pieChartMeta32");
    }else{
        criarGrafico(0, "pieChartMeta32");
    }
}
// /meta 3.2

// meta 4.1
function recuperarDadosMeta41a(data) {
    if (data[0]["met:count:matricula:id"]) {
        meta41a = parseInt(data[0]["met:count:matricula:id"]);
    }
    console.log("Meta 4.1 a: " + meta41a);
}
function recuperarDadosMeta41b(data) {
    meta41b = parseInt(data[1]["V"]);
    console.log("Meta 4.1b: " + meta41b);
    calcularDadosMeta41();
}
function calcularDadosMeta41() {
    var dadosEscola = (meta41a / meta41b) * 100;
    criarGrafico(dadosEscola.toFixed(2), "pieChartMeta41");
}
// /meta 4.1

// meta 9.1
function recuperarDadosMeta91b(data) {
    if (data[0]) {
        for (var i = 1; i < data.length; i++) {
            meta91b += parseInt(data[i]["V"]);
        }
        console.log("Meta 9.1 b: " + meta91b);
    }
}
function recuperarDadosMeta91c(data) {
    if (data[0]){
        for (var i = 1; i<data.length; i++){
            meta91c += parseInt(data[i]["V"]);
        }
        console.log("Meta 9.1 c: " + meta91c);
    }
    calcularDadosMeta91();
}
function calcularDadosMeta91() {
    var dadosEscola = (meta91b/meta91c) * 100;
    criarGrafico(dadosEscola.toFixed(2), "pieChartMeta91");
}
// /meta 9.1


// CRIAR GRAFICOS PIZZA ÚNICA
function criarGrafico(dadoEscola, elementID) {
    var ctxP = document.getElementById(elementID).getContext('2d');

    // gráfico para o caso de não se aplicar a meta (fica somente a legenda com o texto)
    if (dadoEscola == 0.0) {
        var myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: ["Não se aplica a esta escola"],
                datasets: [{
                    data: [0],
                    backgroundColor: ["#F7464A"],
                    hoverBackgroundColor: ["#FF5A5E"]
                }]
            },
            options: {
                responsive: false
            }
        });
    } else {
        var myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: ["Escola", "Município"],
                datasets: [{
                    data: [dadoEscola, (100 - dadoEscola)],
                    backgroundColor: ["#F7464A", "#46BFBD"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                }]
            },
            options: {
                responsive: false
            }
        });
    }
}
// /CRIAR GRAFICOS PIZZA ÚNICA


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}