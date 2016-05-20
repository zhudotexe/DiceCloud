import React from 'react';
import Radium from 'radium';
import Flexbox from '../Flexbox.jsx';
import { Accounts, STATES } from 'meteor/std:accounts-basic';

export const Login = () => (
    <Flexbox alignItems='center' justifyContent='center'>
        <Accounts.ui.LoginForm
            formState={STATES.SIGN_IN}
            signUpPath={'/signup'}
        />
    </Flexbox>
);
export const Signup = () => (
    <Flexbox alignItem='center' justifyContent='center'>
        <Accounts.ui.LoginForm
            formState={STATES.SIGN_UP}
            loginPath={'/login'}
        />
    </Flexbox>
);
