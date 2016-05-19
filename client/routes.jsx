import React from 'react';
//import FlowRouter from 'meteor/kadira:flow-router';
import { render } from 'react-dom';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/std:accounts-basic';
//import {Guide} from '../imports/ui/pages/guide.jsx';
//import Layout from '../imports/ui/layout.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppContainer from '../imports/ui/App.jsx';
import Home from '../imports/ui/pages/Home.jsx';
import Login from '../imports/ui/pages/Login.jsx';
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

addSimpleRoute('/', 'Home', <Home />);
addSimpleRoute('/login', 'Login', <Accounts.ui.LoginForm />);
addSimpleRoute('/guide', 'Guide', <Guide />);

Accounts.ui.config({
    loginPath: '/login',
    onSignedInHook:  () => FlowRouter.go('/'),
    onSignedOutHook: () => FlowRouter.go('/'),
});
