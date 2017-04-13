import React from 'react';
import Col from 'jsxstyle/Col';
import Row from 'jsxstyle/Row';
import Block from 'jsxstyle/Block';
import { grey500, red600, grey100 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

const SignInButtons = () => {
    let user = Meteor.user();
    if (user) return (<div />);
    return (
        <Row justifyContent='space-around' verticalAlign='bottom'>
            <Block>
                <RaisedButton
                    label='Sign in'
                    labelColor={grey100}
                    backgroundColor={red600}
                    style={styles.button}
                    onTouchTap={() => FlowRouter.go('/login')}
                />
            </Block>
            <Block>
                <RaisedButton
                    label='Sign up'
                    labelColor={grey100}
                    backgroundColor={red600}
                    style={styles.button}
                    onTouchTap={() => FlowRouter.go('/signup')}
                />
            </Block>
        </Row>
    );
};
const Splash = ({style}) => (
    <Col alignItems='center' style={style}>
        <Block fontSize='45px' color={grey500} marginBottom='30px'>
            Dice Cloud
        </Block>
        <img style={{width: '130px', minHeight: '130px'}}
            src='/png/crown-dice-logo-cropped-transparent.png' />
        <Block fontSize='36px' color={grey500} marginTop='30px'>
            Unofficial Online Realtime D&amp;D 5e App
        </Block>
        <h2>
            Spend less time shuffling paper and more time playing the game
        </h2>
        <SignInButtons />
    </Col>
);
export default Splash;
var styles = {
    button: {
        marginLeft:  '20px',
        marginRight: '20px',
        boxSizing: 'border-box',
    },
};
