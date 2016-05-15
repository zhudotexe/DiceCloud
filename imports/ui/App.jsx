import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Sidebar from './Sidebar.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Flexbox from './Flexbox.jsx';
import Radium from 'radium';

import { grey800, darkBlack } from 'material-ui/styles/colors';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawer: true };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.render = this.render.bind(this);
    }

    toggleDrawer(bool) {
        this.setState({ drawer: !this.state.drawer });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Flexbox style={styles.app}>
                    <Sidebar visible={this.state.drawer} />
                    <Flexbox dir='column' style={styles.body}>
                        <header style={styles.header}>
                            <AppBar
                                title={this.props.title}
                                titleStyle={{fontSize: '1.3em'}}
                                onLeftIconButtonTouchTap={this.toggleDrawer}
                            />
                        </header>
                        <div id="main" style={styles.main}>
                            {this.props.view}
                        </div>
                    </Flexbox>
                </Flexbox>
            </MuiThemeProvider>
        );
    }
}
App = Radium(App);
var styles = {
    app: {
        height: '100%',
        overflow: 'hidden',
    },
    body: {
        width: '100%',
    },
    header: {
        flex: '0 1 auto',
    },
    main: {
        flex: '1 1 auto',
        overflow: 'auto',
    }
};
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey800,
        textColor: darkBlack,
    },
});

export default AppContainer = createContainer(props => {
    return {
        //user: Meteor.user(),
        user: 'robert',
    };
}, App);

