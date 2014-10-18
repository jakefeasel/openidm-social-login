define("org/forgerock/openidm/ui/custom/LoginHelper", [
    "./OpenIDConnectDelegate",
    "org/forgerock/openidm/ui/common/login/InternalLoginHelper",
    "org/forgerock/commons/ui/common/main/Configuration",
    "org/forgerock/commons/ui/common/main/ServiceInvoker"
], function (oidcDelegate, idmLoginHelper, conf, serviceInvoker) {

    var LoginHelper = function () {},
        obj;

    LoginHelper.prototype = idmLoginHelper;
    
    obj = new LoginHelper();

    obj.getLoggedUser = function (successCallback, errorCallback) {
        var serviceInvokerConfig = serviceInvoker.configuration,
            oidcToken = oidcDelegate.getOIDCToken();

        if (oidcToken) {
            serviceInvokerConfig.defaultHeaders[oidcToken.header] = oidcToken.token;
        }

        return idmLoginHelper.getLoggedUser.call(this, successCallback, errorCallback)
            .always(function () {
                if (oidcToken) {
                    delete serviceInvokerConfig.defaultHeaders[oidcToken.header];
                    oidcDelegate.removeOIDCToken();
                }
            });
    };

    return obj;
});