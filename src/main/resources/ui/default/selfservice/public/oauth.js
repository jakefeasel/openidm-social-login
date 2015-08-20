
require.config({
    paths: {
        underscore: "libs/lodash-2.4.1-min",
        jquery: "libs/jquery-2.1.1-min"
    }
});

require([
    "org/forgerock/commons/ui/common/main/ServiceInvoker",
    "org/forgerock/openidm/ui/custom/OpenIDConnectDelegate"
], function (serviceInvoker, oidc) {
    serviceInvoker.configuration = {
        defaultHeaders: {
            "X-OpenIDM-Username" : "anonymous",
            "X-OpenIDM-Password" : "anonymous",
            "X-OpenIDM-NoSession" : "true"
        }
    };

    oidc.getToken().always(function () {
        window.location.href = oidc.getMainUri();
    });
});
