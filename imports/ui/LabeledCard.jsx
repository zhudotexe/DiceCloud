import React from 'react';
import Card from 'material-ui/Card';
import Row from 'jsxstyle/Row';
import Col from 'jsxstyle/Col';

import { px, margin, statCardHeight } from '../defines.js';

const LabeledCard = (props) => (
    <Card style={{marginBottom: px(margin)}}>
        <Row alignItems='center' height={props.height}>
            <Col
                justifyContent='center'
                alignSelf='stretch'
                padding={px(2*margin)}
                marginRight={px(margin)}
                backgroundColor={props.color}
                style={props.labelStyle}
                minWidth={props.labelWidth}
                maxWidth={props.labelWidth}
            >
                {props.label}
            </Col>
            {props.children}
        </Row>
    </Card>
);
LabeledCard.defaultProps = {
    height: px(statCardHeight),
};
export default LabeledCard;
