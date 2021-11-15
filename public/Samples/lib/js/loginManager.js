(function () {
    var loginManager = function (settings) {
        var self = this;

        self.container;
        self.streamsContainer;
        self.loginFormShown;
        self.connectionDidLogIn;
        self.credentials;

        var connectForm,
            loginForm,
            lastObserver

        function connectToServer() {
            // Connect to the desired server (defaults to the current URL)

            XPMobileSDKSettings.MobileServerURL = "http://localhost:8081/";

            if (lastObserver) {
                XPMobileSDK.removeObserver(lastObserver);
            }

            lastObserver = {
                connectionDidConnect: connectionDidConnect,
                connectionDidLogIn: self.connectionDidLogIn
            };

            XPMobileSDK.addObserver(lastObserver);

            XPMobileSDK.connect("http://localhost:8081/");
        }

        function loginCommand(username, password) {
            XPMobileSDK.login(username, password, null, {
                SupportsAudioIn: 'Yes',
                SupportsAudioOut: 'Yes'
            });
        }

        function login() {
            // Login with the provided credentials

            loginCommand(username, password);

            connectForm.classList.add('display-none');
            loginForm.classList.add('display-none');
        }

        function loadMarkup() {
            var template = '../lib/loginManagerTemplate.htm';

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        self.container.innerHTML = this.responseText;
                    }
                }
            }

            xhttp.open('GET', template, true);
            xhttp.send();
        }

        function normalizeSettings() {
            self.container = settings.container || {};
            self.streamsContainer = settings.streamsContainer || {};
            self.loginFormShown = settings.loginFormShown || function () { };
            self.connectionDidLogIn = settings.connectionDidLogIn || function () { };
            self.credentials = settings.credentials;
        }

        function init() {
            normalizeSettings();

            if (self.credentials) {
                connectionDidConnect = function () {
                    loginCommand(self.credentials.user, self.credentials.pass);
                };

                setTimeout(connectToServer, 800);

                return;
            }

            loadMarkup();
        }

        function destroy() {
            var container = document.getElementById('login-form-container');

            container.parentNode.removeChild(container);
        }

        return {
            init: init,
            destroy: destroy
        };
    };

    loginManager.loadAndLogin = function (params) {
        function loadLoginManager() {
            var loginContainer,
                credentials;

            if (!!params.user && !!params.pass) {
                credentials = {
                    user: params.user,
                    pass: params.pass
                };
            }

            params.loginContainerId = params.loginContainerId || 'login-form-container';

            loginContainer = document.getElementById(params.loginContainerId);


            // You can pass username and password for auto-login (just for simplicity in the sample, otherwise - NOT RECOMMENDED)
            var loginManager = new LoginManager({
                credentials: credentials,
                container: loginContainer,
                connectionDidLogIn: function () {
                    loginManager.destroy();

                    params.connectionDidLogIn();
                }
            });

            loginManager.init();
        }

        LoadMobileSdk(loadLoginManager);
    };

    window.LoginManager = loginManager;
})();