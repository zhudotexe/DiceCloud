import React from 'react';
import Col from 'jsxstyle/Col';
import Row from 'jsxstyle/Row';
import Block from 'jsxstyle/Block';
import CharacterCard from '../../CharacterCard.jsx';
import { GetCharacter } from '../../../character_retriever.js';
import { grey50, grey600, green500, deepPurple500 } from 'material-ui/styles/colors';

const DemoSheets = ({style}) => (
    <Col alignItems='center' style={style}>
        <Col alignItems='flex-start'>
            <Block fontSize='34px' color={grey600}>
                Character Sheet Open Beta
            </Block>
            <h2> Check out the example characters </h2>
            <CardRow />
        </Col>
    </Col>
);
const CardRow = () => (
    <Row flexWrap='wrap' justifyContent='space-between'>
        <CharacterCard
            zDepth={3}
            style={styles.exampleCard}
            character={GetCharacter('starter-set-ranger')}
        />
        <CharacterCard
            zDepth={3}
            style={styles.exampleCard}
            character={GetCharacter('starter-set-wizard')}
        />
    </Row>
);
export default DemoSheets;
var styles = {
    exampleCard: {
        margin: '4px',
        zDepth: 3,
    },
};
