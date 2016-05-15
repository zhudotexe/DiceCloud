import React from 'react';
//import FlowRouter from 'meteor/kadira:flow-router';
import { render } from 'react-dom';
import { mount } from 'react-mounter';
//import {Guide} from '../imports/ui/pages/guide.jsx';
//import Layout from '../imports/ui/layout.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppContainer from '../imports/ui/App.jsx';
import Home from '../imports/ui/pages/Home.jsx';
import Guide from '../imports/ui/pages/Guide.jsx';

function scrollReset() {
    let element = document.getElementById('main');
    if (element) {
        element.scrollTop = 0;
    }
}
FlowRouter.triggers.enter([scrollReset]);

FlowRouter.route('/', {
    action: function() {
        mount(AppContainer, {
            title: 'Home',
            view: <Home />,
        });
    }
});

FlowRouter.route('/guide', {
    action: function() {
        mount(AppContainer, {
            title: 'Guide',
            view: <Guide />,
        });
    }
});
