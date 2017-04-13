import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPeople from 'material-ui/svg-icons/social/people';
import SocialSchool from 'material-ui/svg-icons/social/school';
import ActionBugReport from 'material-ui/svg-icons/action/bug-report';
import ActionList from 'material-ui/svg-icons/action/list';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';
import Inline from 'jsxstyle/Inline';

const Link = (props) => (
    <Inline component='a' props={{href: props.href}} color='white'>{props.children}</Inline>
);
Link.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
const UserAccountLink = () => {
    const user = Meteor.user();
    const path = user ? '/account' : '/login';
    const text = user ? ((user.profile && user.profile.name) ||
                          user.username || 'My Account')
                        : 'Sign In';

    return (<Link href={path}>{text}</Link>);
};
const LogoImage = () => (
    <Block
        minHeight='146px'
        padding='15px'
        backgroundSize='cover'
        backgroundImage='url(/png/paper-dice-crown.png)'
    >
        <UserAccountLink />
    </Block>
);
export default class Sidebar extends React.Component {
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
            <Col flex='0 0 256px' height='100%' display={this.display()}>
                <Paper rounded={false} style={styles.sidebar.paper}>
                    <LogoImage />
                    <Link href="/">
                        <MenuItem primaryText="Home" leftIcon={<ActionHome />} />
                    </Link>
                    {Meteor.user() ?
                        <Link href="/characters">
                            <MenuItem primaryText="Characters" leftIcon={<SocialPeople />} />
                        </Link>
                        : <div></div>
                    }
                    <Link href="/guide">
                        <MenuItem primaryText="Guide" leftIcon={<SocialSchool />} />
                    </Link>
                    <MenuItem primaryText="Send Feedback" leftIcon={<ActionBugReport />} />
                    <MenuItem primaryText="Changelog" leftIcon={<ActionList />} />
                </Paper>
            </Col>
        );
    }
}
var styles = {
    sidebar: {
        paper: {
            marginTop: 0,
            marginLeft: 0,
            height: '100%',
        },
    },
};

