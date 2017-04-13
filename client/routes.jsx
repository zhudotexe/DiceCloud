import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/std:accounts-basic';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import AppContainer from '../imports/ui/App.jsx';

import Home from '../imports/ui/pages/Home.jsx';
import { Login, Signup } from '../imports/ui/pages/Login.jsx';
import Account from '../imports/ui/pages/Account.jsx';
import Guide from '../imports/ui/pages/Guide.jsx';
import Characters from '../imports/ui/pages/Characters.jsx';
import Character from '../imports/ui/pages/Character.jsx';
import { GetCharacter } from '../imports/character_retriever.js';

Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY',
    loginPath: '/login',
    onSignedInHook:  () => FlowRouter.go('/'),
    onSignedOutHook: () => FlowRouter.go('/login'),
});


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
        },
        name: title,
    });
}

addSimpleRoute('/',             'Home',         <Home />);
addSimpleRoute('/login',        'Login',        <Login />);
addSimpleRoute('/signup',       'Signup',       <Signup />);
addSimpleRoute('/account',      'Account',      <Account />);
addSimpleRoute('/guide',        'Guide',        <Guide />);
addSimpleRoute('/characters',   'Characters',   <Characters />);
FlowRouter.route('/character/:uid', {
    action: function(params) {
        // TODO: validate allowed-to-see
        const character = GetCharacter(params.uid);
        mount(AppContainer, {
            title: character.name,
            view: <Character data={character} />,
            barColor: character.color,
        });
    },
    name: 'Character',
});
