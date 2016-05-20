import React from 'react';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500, lightGreen500 } from 'material-ui/styles/colors';

const VerifiedIcon = (props) => {
    if (props.verified) {
        return (
            <IconButton
                disableTouchRipple={true}
                tooltip={'Email verified!'}>
                <ActionCheckCircle color={lightGreen500} />
            </IconButton>
        );
    } else {
        const user = Meteor.user();
        let needUpdate = (!user.emails) || (props.address !== user.emails[0].address);
        return (
            <RaisedButton
                label='Verify'
                icon={<AlertWarning />}
                disabled={needUpdate}
                tooltip={needUpdate ? 'Please click Update first' : null}
                backgroundColor={orange500}
                onTouchTap={() => Meteor.call('verify', Meteor.userId())}
            />
        );
    }
};
export default VerifiedIcon;
