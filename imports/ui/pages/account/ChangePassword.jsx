import React from 'react';
import Col from 'jsxstyle/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { indigo500 } from 'material-ui/styles/colors';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edited: false,
            passwordsMatch: false,
            emptyPassword: false,
            oldPassword: '',
            newPassword: '',
        };
    }

    render() {
        return (
            <Col>
                <h2>Change Password</h2>
                <TextField
                    floatingLabelText='Current Password'
                    onChange={(event, value) => this.setState({oldPassword: value})}
                    type='password'
                />
                <TextField
                    floatingLabelText='New Password'
                    onChange={(event, value) => {
                        this.setState({
                            newPassword: value,
                            emptyPassword: value.length < 1,
                            edited: true,
                        });
                    }}
                    type='password'
                />
                <TextField
                    floatingLabelText='Confirm New Password'
                    errorText={
                        !this.state.edited        ? null :
                        this.state.emptyPassword  ? 'Password is too short' :
                        this.state.passwordsMatch ? null :
                        'Passwords do not match'
                    }
                    onChange={(event, value) => {
                        if (value === this.state.newPassword) {
                            this.setState({passwordsMatch: true});
                        }
                        this.setState({
                            emptyPassword: value.length < 1,
                            edited: true,
                        });
                    }}
                    type='password'
                />
                <RaisedButton
                    label='Change Password'
                    backgroundColor={indigo500}
                    disabled={!this.state.passwordsMatch || this.state.emptyPassword}
                    onTouchTap={() => Accounts.changePassword(
                        this.state.oldPassword,
                        this.state.newPassword,
                        () => FlowRouter.go('/account'))}
                    style={styles.buttonSpacer}
                    />
            </Col>
        );
    }
}
export default ChangePassword;

const styles = {
    buttonSpacer: {
        marginTop: '15px',
    },
};

