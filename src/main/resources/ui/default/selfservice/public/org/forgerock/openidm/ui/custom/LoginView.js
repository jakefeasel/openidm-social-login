/*global define */

define("org/forgerock/openidm/ui/custom/LoginView", [
    "underscore",
    "./OpenIDConnectDelegate",
    "org/forgerock/openidm/ui/LoginView"
], function(_, oidcDelegate, idmLoginView) {

    var LoginView = function () {},
        obj;

    LoginView.prototype = idmLoginView;

    obj = new LoginView();

    obj.template = "templates/custom/LoginTemplate.html";

    obj.render = function (args, callback) {

        oidcDelegate.getProviders().then(_.bind(function (oidcProviders) {
            this.data.oidcProviders = oidcProviders;
            idmLoginView.render.call(this, args, callback);
        }, this));

    };

    obj.events["click input.oidcProvider"] = _.bind(function (e) {
        e.preventDefault();

        var provider = _.find(this.data.oidcProviders, function (r) {
            return r.name === $(e.target).val();
        });

        window.location.href = provider.authorization_endpoint +
                                '?response_type=code&scope=openid%20profile%20email' +
                                '&redirect_uri=' + oidcDelegate.getRedirectUri() +
                                '&state=' + provider.name +
                                '&client_id=' + provider.client_id;

    }, obj);

    return obj;
});
