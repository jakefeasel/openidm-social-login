/*global $, define, _, localStorage */

define("org/forgerock/openidm/ui/custom/OpenIDConnectDelegate", [
    "org/forgerock/commons/ui/common/util/Constants",
    "org/forgerock/commons/ui/common/main/AbstractDelegate"
], function(constants, AbstractDelegate) {

    var obj = new AbstractDelegate(constants.host + "/openidm/endpoint/oidc");
    
    obj.getProviders = function () {
        return obj.serviceCall({
            "type": "GET",
            "url" : ""
        });
    };

    obj.getURLParams = function () {
        return _.chain( window.location.search.replace(/^\?/, '').split("&") )
            .map(function (arg) { 
                return arg.split("="); 
            })
            .object()
            .value();
    };

    obj.getToken = function () {
        var params = this.getURLParams();
        return obj.serviceCall({
            "type": "POST",
            "url": "?_action=getToken&code=" + params.code + "&name=" + params.state + "&redirect_uri=" + this.getRedirectUri()
        }).then(function (result) {
            localStorage.setItem("oidcToken", JSON.stringify(result));
            return result;
        });
    };

    obj.getRedirectUri = function () {
        return  window.location.protocol + "//" + window.location.host + 
                window.location.pathname.replace(/(\/index\.html)|(\/$)/, '/oauth.html');
    };

    obj.getMainUri = function () {
        return  window.location.protocol + "//" + window.location.host + 
                window.location.pathname.replace(/(\/oauth\.html)|(\/$)/, '/index.html');
    };

    return obj;
});



