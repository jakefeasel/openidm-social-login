OpenIDM Sample for Social Login with OpenID Connect
===================================================

This is a sample project demonstrating the use of OpenID Connect within OpenIDM. It presents a single visible enhancment to the default OpenIDM project - a new button on the /openidmui login page that allows the user to login with Google in addition to the more traditional username and password. Once logged in, the user will be automatically created in the local managed/user table; a matching record will then be created (via the normal sync process) in an LDAP server.

This project will start up three small virtual machines - one for PostgreSQL 9.3, one for OpenDJ 2.6.0, and one for OpenIDM 3.1 (which will be modified to include these customizations).

This project was created using the [OpenIDM Custom Project Boilerplate](https://github.com/jakefeasel/openidm-boilerplate).

##Requirements

To use this sample, you will need [Vagrant](http://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/) installed locally. You also must have a [Google Project](https://console.developers.google.com/project) created to use with this sample, setup to use OAuth.

Here are the instructions for setting up a new Project for use in this sample:

1. Login here with your Google credentials: [https://console.developers.google.com/project](https://console.developers.google.com/project)
2. Click 'Create Project'; when prompted, enter a name (openidm-social-login isn't a bad idea)
3. After a moment, the above process will complete and you will see your new project listed under 'Projects'. Click on the name.
4. Expand the 'APIs & auth' menu and click on 'Credentials'
5. Under 'OAuth', click 'Create new Client ID'

6. Submit the details for the new client:

    'Application Type' = 'Web application'

    'Authorized JavaScript Origins' = https://localhost:18443

    'Authorized Redirect URI' = https://localhost:18443/oauth.html

7. Copy the values shown for "Client ID" and "Client Secret" into src/main/resources/conf/authentication.json, within this block (obviously replacing #your_client_id with the actual value, and same for client_secret):

                        {
                            "name" : "Google",
                            "icon" : "https://developers.google.com/accounts/images/sign-in-with-google.png",
                            "client_id" : "#your_client_id",
                            "client_secret" : "#your_client_secret",
                            "authorization_endpoint" : "https://accounts.google.com/o/oauth2/v2/auth",
                            "token_endpoint" : "https://www.googleapis.com/oauth2/v4/token",
                            "userinfo_endpoint" : "https://www.googleapis.com/oauth2/v3/userinfo",
                            "well-known" : "https://accounts.google.com/.well-known/openid-configuration"
                        }

8. Go back to the Google console and click on the "Consent screen" menu option
9. Enter your email address and a product name ("OpenIDM Social Login Demo" isn't a bad choice). You could also fill in the optional fields, if you want. Click 'Save' when finished.
10. Click on the "APIs" menu option
11. Search for 'Google+' under 'Browse APIs'. Toggle status for the 'Google+ API' option; this should enable it and include in your list of enabled APIs.

##Starting the project

Download (or fork & clone) this project into your local environment. Add it to your source control if you are planning on making changes.

Once you have satisfied the above requirements, just run one command:

    vagrant up

This will take a while to download the base image and all of the many dependencies. Once it has finished, you will have the software running in a set of VMs. You can now access your local server at [https://localhost:18443/openidmui/](https://localhost:18443/) and [https://localhost:18443/admin/](https://localhost:18443/admin/).

When you load [https://localhost:18443/](https://localhost:8443/), you should see a new button to 'Sign in with Google'. Clicking on this should take users to the Google login and consent pages. Assuming they approve access, they will be redirected back to your sample. At that point, they will be provisioned into managed/user and synced to OpenDJ (this will be transparent to the user). They will then be sent to the normal OpenIDM UI, logged in as their newly-created user.


##Major areas of development for this project

This project was started using the [OpenIDM Custom Project Boilerplate](https://github.com/jakefeasel/openidm-boilerplate). The additions that I have made include:

* Adding in a new virtual machine for hosting OpenDJ 2.6.0 - see details within vagrant\_scripts/dj\_bootstrap.sh
* UI customizations - various files under src/main/resources/ui/default/enduser/public, main ones under org/forgerock/openidm/ui/custom
* A new endpoint to assist with obtaining an OpenID Connect token and fetching the user details to insert into managed/user
* Configuration for OpenID Connect authentication, ldap connection and sync all within src/main/resources/config
