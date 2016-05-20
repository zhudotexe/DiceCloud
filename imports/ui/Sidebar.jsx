import React from 'react';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialSchool from 'material-ui/svg-icons/social/school';
import ActionBugReport from 'material-ui/svg-icons/action/bug-report';
import ActionList from 'material-ui/svg-icons/action/list';
import Radium from 'radium';

const UserAccountLink = () => {
    const user = Meteor.user();
    const loggedIn = user !== null && user !== undefined;
    const path = loggedIn ? '/account' : '/login';
    const text = loggedIn ? ((user.profile && user.profile.name) ||
                            user.username || 'My Account')
                          : 'Sign In';

    return (<a href={path} style={styles.account.link}>{text}</a>)
};
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.display = this.display.bind(this);
    }
    display() {
        return this.props.visible ? 'flex' : 'none';
    }
    render() {
        return (
            <div id='sidebar' style={[
                styles.sidebar.base,
                {display: this.display()}
            ]}>
                <Paper rounded={false} style={styles.sidebar.paper}>
                    <div style={styles.sidebar.image}>
                        <UserAccountLink />
                    </div>
                    <a href="/" style={styles.sidebar.link}>
                        <MenuItem primaryText="Home" leftIcon={<ActionHome />} />
                    </a>
                    <a href="/guide" style={styles.sidebar.link}>
                        <MenuItem primaryText="Guide" leftIcon={<SocialSchool />} />
                    </a>
                    <MenuItem primaryText="Send Feedback" leftIcon={<ActionBugReport />} />
                    <MenuItem primaryText="Changelog" leftIcon={<ActionList />} />
                </Paper>
            </div>
        );
    }
}
// meteor's ecmascript package doesn't do decorators yet, so
// we can't just say "@Radium export default class..."; this is
// a good workaround.
export default Radium(Sidebar);
var styles = {
    sidebar: {
        base: {
            flexDirection: 'column',
            flexBasis: '256px',
            flexShrink: 0,
            height: '100%',
        },
        paper: {
            marginTop: 0,
            marginLeft: 0,
            height: '100%',
        },
        image: {
            backgroundImage: 'url(/png/paper-dice-crown.png)',
            backgroundSize: 'cover',
            display: 'block',
            minHeight: '146px',
            padding: '15px',
        },
        link: {
            textDecoration: 'none',
        },
    },
    account: {
        link: {
            color: 'white',
        },
    },
};

