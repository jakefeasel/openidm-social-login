/*global $, define, _ */

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

    obj.getRedirectUri = function () {
        return  window.location.protocol + "//" + window.location.host + 
                window.location.pathname.replace(/(\/index\.html)|(\/$)/, '/oauth.html');
    };

    return obj;
});



