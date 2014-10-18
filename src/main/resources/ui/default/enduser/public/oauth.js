requirejs.config({
    paths: {
        moment: "libs/moment-2.8.1-min",
        xdate: "libs/xdate-0.8-min",
        jquery: 'libs/jquery-1.11.1-min',
        underscore: 'libs/lodash-2.4.1-min'
    }
});

require([
    "jquery",
    "org/forgerock/commons/ui/common/main/ServiceInvoker",
    "org/forgerock/openidm/ui/custom/OpenIDConnectDelegate"
], function ($, serviceInvoker, oidc) {
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