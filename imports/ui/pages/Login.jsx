import React from 'react';
import Row from 'jsxstyle/Row';
import { Accounts, STATES } from 'meteor/std:accounts-basic';

export const Login = () => (
    <Row alignItems='center' justifyContent='center'>
        <Accounts.ui.LoginForm
            formState={STATES.SIGN_IN}
            signUpPath={'/signup'}
        />
    </Row>
);

export const Signup = () => (
    <Row alignItems='center' justifyContent='center'>
        <Accounts.ui.LoginForm
            formState={STATES.SIGN_UP}
            loginPath={'/login'}
        />
    </Row>
);
