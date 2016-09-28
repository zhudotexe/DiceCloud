import React from 'react';
//import FlowRouter from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/std:accounts-basic';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppContainer from '../imports/ui/App.jsx';

import Home from '../imports/ui/pages/Home.jsx';
import { Login, Signup } from '../imports/ui/pages/Login.jsx';
import Account from '../imports/ui/pages/Account.jsx';
import Guide from '../imports/ui/pages/Guide.jsx';

function scrollReset() {
    let element = document.getElementById('main');
    if (element) {
        element.scrollTop = 0;
    }
}
FlowRouter.triggers.enter([scrollReset]);

function addSimpleRoute(route, title, view) {
    FlowRouter.route(route, {
        action: function() {
            mount(AppContainer, {
                title: title,
                view: view,
            });
        }
    });
}

addSimpleRoute('/',        'Home',    <Home />);
addSimpleRoute('/login',   'Login',   <Login />);
addSimpleRoute('/signup',  'Signup',  <Signup />);
addSimpleRoute('/account', 'Account', <Account />);
addSimpleRoute('/guide',   'Guide',   <Guide />);

Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY',
    loginPath: '/login',
    onSignedInHook:  () => FlowRouter.go('/'),
    onSignedOutHook: () => FlowRouter.go('/login'),
});


