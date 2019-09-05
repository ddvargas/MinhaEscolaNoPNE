var escolaID;
window.onload = function () {
    //Recuperar id da instituição
    escolaID = getParameters("escolaID");
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