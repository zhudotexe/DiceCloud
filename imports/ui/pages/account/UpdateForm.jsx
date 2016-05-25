import React from 'react';
import Radium from 'radium';
import Flexbox from '../../Flexbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import VerifiedIcon from './VerifiedIcon.jsx';
import { deepPurple500 } from 'material-ui/styles/colors';

class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        const user = Meteor.user();
        this.defaults = {
            name:     user.profile && user.profile.name      || null,
            address:  user.emails  && user.emails[0].address || null,
        };
        this.state = {
            name:     this.defaults.name,
            address:  this.defaults.address,
            verified: user.emails  && user.emails[0].verified,
            changed:  false,
        };
        this.setChanged = this.setChanged.bind(this);
    }
    setChanged() {
        this.setState({
            changed: (this.state.name    !== this.defaults.name) ||
                     (this.state.address !== this.defaults.address),
        });
    }
    render() {
        return (
            <Flexbox dir='column' style={styles.base}>
                <h2>Profile Information</h2>
                <TextField
                    floatingLabelText="Name"
                    defaultValue={this.state.name}
                    onChange={(event, value) => {
                        this.setState({name: value}, this.setChanged);
                    }}
                />
                <Flexbox alignItems='center'>
                    <TextField
                        floatingLabelText="Email"
                        defaultValue={this.state.address}
                        errorText={this.state.address && this.state.address.length > 0 ? null : 'This field is required'}
                        onChange={(event, value) => {
                            this.setState({address: value}, this.setChanged);
                        }}
                        style={styles.roomForError}
                    />
                    <VerifiedIcon
                        address={this.state.address}
                        verified={this.state.verified}
                    />
                </Flexbox>
                <RaisedButton
                    label='Update'
                    backgroundColor={deepPurple500}
                    disabled={!this.state.changed ||
                        (!this.state.address || this.state.address.length < 1)}
                    onTouchTap={() => Meteor.call('updateUser',
                        this.state.name,
                        this.state.address,
                        (error, result) => {
                            if (error)
                                console.warn(error);
                            this.setChanged();
                        }
                    )}
                />
            </Flexbox>
        );
    }
};
export default Radium(UpdateForm);

const styles = {
    base: {
        marginBottom: '20px',
    },
    roomForError: {
        marginBottom: '15px',
        marginRight: '4px',
    },
};

