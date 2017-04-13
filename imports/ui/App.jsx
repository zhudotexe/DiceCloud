import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Sidebar from './Sidebar.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Flex from 'jsxstyle/Flex';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';
import { grey800, darkBlack } from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import jsxstyle from 'jsxstyle';
jsxstyle.install();

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
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <Flex height='100%' overflow='hidden'>
                    <Sidebar
                        visible={this.state.drawer}
                        user={this.props.user}
                    />
                    <Col width='100%' backgroundColor='#e0e0e0'>
                        <Flex component='header' flexGrow='0' flexShrink='0'>
                            <AppBar
                                title={this.props.title}
                                titleStyle={{fontSize: '1.3em'}}
                                onLeftIconButtonTouchTap={this.toggleDrawer}
                                style={this.props.barColor ? {
                                    backgroundColor: this.props.barColor,
                                } : {}}
                                zDepth={this.props.barColor ? 0 : 1}
                            />
                        </Flex>
                        <Block id="main" flexGrow='1' overflow='auto'>
                            {React.cloneElement(this.props.view, {user: this.props.user})}
                        </Block>
                    </Col>
                </Flex>
            </MuiThemeProvider>
        );
    }
}
const theme = {
    palette: {
        primary1Color: grey800,
        textColor: darkBlack,
    },
};

const AppContainer = createContainer(props => {
    const user = Meteor.user()
    return {
        user: user
    };
}, App);
export default AppContainer;

