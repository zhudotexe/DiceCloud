import React from 'react';
import Radium from 'radium';
import Flexbox from '../Flexbox.jsx';
import { StyleRoot } from 'radium';
import UpdateForm from './account/UpdateForm.jsx';

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyleRoot>
                <Flexbox style={styles.responsive}>
                    <Accounts.ui.LoginForm />
                    <UpdateForm />
                </Flexbox>
            </StyleRoot>
        );
    }
};
export default Radium(Account);

const styles = {
    responsive: {
        flexDirection: 'row',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
        // 923 = 667 + 256; 256 is width of sidebar
        '@media (max-width: 923px)': {
            flexDirection: 'column',
        },
    },
};
