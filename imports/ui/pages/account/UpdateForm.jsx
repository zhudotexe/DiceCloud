import React from 'react';
import { Meteor } from 'meteor/meteor';
import Row from 'jsxstyle/Row';
import Col from 'jsxstyle/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { deepPurple500 } from 'material-ui/styles/colors';

import VerifiedIcon from './VerifiedIcon.jsx';

export default class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        const user = this.props.user;
        this.state = this.getStateFromUser(user);
    }
    getStateFromUser = (user) => {
        const defaults = {
            name:     user && user.profile && user.profile.name      || null,
            address:  user && user.emails  && user.emails[0].address || null,
        };
        return {
            defaults: defaults,
            name:     defaults.name,
            address:  defaults.address,
            verified: user && user.emails && user.emails[0].verified,
        };
    }
    onNameChange = (event, value)  => this.setState({name: value});
    onEmailChange = (event, value) => this.setState({address: value});
    onUpdateTap = () => {
        Meteor.call('updateUser', {
            name: this.state.name,
            address: this.state.address,
        }, (error, result) => {
            if (error) {
                console.error(error);
            }
            console.warn(result);
        });
    }
    componentWillReceiveProps(nextProps) {
        const user = nextProps.user;
        this.setState(this.getStateFromUser(user));
    }
    render() {
        const changed = (this.state.name    !== this.state.defaults.name) ||
                        (this.state.address !== this.state.defaults.address);
        const updatable = changed && this.state.address && this.state.address.length > 0;
        if (this.props.user === undefined) {
            return (<div>Loading...</div>);
        }
        return (
            <Col marginBottom='20px'>
                <h2>Profile Information</h2>
                <TextField
                    floatingLabelText="Name"
                    defaultValue={this.state.name}
                    onChange={this.onNameChange}
                />
                <Row alignItems='center'>
                    <TextField
                        floatingLabelText="Email"
                        defaultValue={this.state.address}
                        errorText={this.state.address && this.state.address.length > 0 ? null : 'This field is required'}
                        onChange={this.onEmailChange}
                        style={styles.roomForError}
                    />
                    <VerifiedIcon
                        address={this.state.address}
                        verified={this.state.verified}
                    />
                </Row>
                <RaisedButton
                    label='Update'
                    backgroundColor={deepPurple500}
                    disabled={!updatable}
                    onTouchTap={this.onUpdateTap}
                />
            </Col>
        );
    }
}

const styles = {
    roomForError: {
        marginBottom: '15px',
        marginRight: '10px',
    },
};

