import React from 'react';
import Radium from 'radium';
import Flexbox from '../../Flexbox.jsx';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { grey50, grey600, green500, deepPurple500 } from 'material-ui/styles/colors';

const DemoSheets = ({style}) => (
    <Flexbox dir='column' style={style} alignItems='center'>
        <Flexbox dir='column' alignItems='flex-start'>
            <div style={styles.title}>
                Character Sheet Open Beta
            </div>
            <h2> Check out the example characters </h2>
            <CardRow />
        </Flexbox>
    </Flexbox>
);
const CardRow = () => (
    <Flexbox flexWrap='wrap' justifyContent='space-between'>
        <Card style={styles.exampleCard} zDepth={3}>
            <CardHeader
                title='Starter Set Archer'
                titleStyle={styles.cardTitle}
                style={{backgroundColor: green500}}
            />
            <CardText> Lawful Good Human </CardText>
        </Card>
        <Card style={styles.exampleCard} zDepth={3}>
            <CardHeader
                title='Starter Set Wizard'
                titleStyle={styles.cardTitle}
                style={{backgroundColor: deepPurple500}}
            />
            <CardText> Chaotic Good High Elf </CardText>
        </Card>
    </Flexbox>
);
export default Radium(DemoSheets);
var styles = {
    title: {
        fontSize: '34px',
        color: grey600,
    },
    exampleCard: {
        margin: '4px',
        zDepth: 3,
    },
    cardTitle: {
        color: grey50,
        fontWeight: 'normal',
    },

};
