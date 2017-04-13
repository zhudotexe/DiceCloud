import React from 'react';
import { Accounts}  from 'meteor/std:accounts-basic';
import Col from 'jsxstyle/Col';

import UpdateForm from './account/UpdateForm.jsx';

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col justifyContent='spaceBetween' alignItems='center'>
                <Accounts.ui.LoginForm />
                <UpdateForm
                    user={this.props.user}
                />
            </Col>
        );
    }
}
export default Account;
