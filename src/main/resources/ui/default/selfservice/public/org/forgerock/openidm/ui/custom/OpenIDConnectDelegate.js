/*global define, localStorage */

define("org/forgerock/openidm/ui/custom/OpenIDConnectDelegate", [
    "underscore",
    "org/forgerock/commons/ui/common/util/Constants",
    "org/forgerock/commons/ui/common/main/AbstractDelegate"
], function(_, constants, AbstractDelegate) {

    var obj = new AbstractDelegate(constants.host + "/openidm/endpoint/oidc"),
        getURLParams = function () {
            return _.chain( window.location.search.replace(/^\?/, '').split("&") )
                .map(function (arg) {
                    return arg.split("=");
                })
                .object()
                .value();
        };

    obj.getMainUri = function () {
        return  window.location.protocol + "//" + window.location.host +
                window.location.pathname.replace(/(\/oauth\.html)|(\/$)/, '/index.html');
    };

    obj.getRedirectUri = function () {
        return  window.location.protocol + "//" + window.location.host +
                window.location.pathname.replace(/(\/index\.html)|(\/$)/, '/oauth.html');
    };

    obj.getProviders = function () {
        return obj.serviceCall({
            "type": "GET",
            "url" : ""
        });
    };


    obj.getToken = function () {
        var params = getURLParams();
        return obj.serviceCall({
            "type": "POST",
            "url": "?_action=getToken&code=" + params.code + "&name=" + params.state + "&redirect_uri=" + obj.getRedirectUri()
        }).then(function (result) {
            localStorage.setItem("oidcToken", JSON.stringify(result));
            return result;
        });
    };

    obj.getOIDCToken = function () {
        var token = localStorage.getItem("oidcToken");

        if (token) {
            token = JSON.parse(token);
            return token;
        } else {
            return null;
        }
    };

    obj.removeOIDCToken = function () {
        localStorage.removeItem("oidcToken");
    };


    return obj;
});
