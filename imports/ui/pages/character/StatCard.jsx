import React, { Component } from 'react';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import { grey100 } from 'material-ui/styles/colors.js';
import ElementWithDialog from './ElementWithDialog.jsx';
import { statCardHeight, hrStyle, displaySign, margin, px } from '../../../defines.js';
import LabeledCard from '../../LabeledCard.jsx';
import StatBreakdown from './StatBreakdown.jsx';

const NiceHR = () => (
    <Block component='hr'
        width='100%'
        borderColor={grey100}
        borderStyle='solid'
        marginBottom={px(3 * margin)}
    />
);
const CardLabel = (props) => {
    const light = 'rgba(240, 240, 240, 0.8)';
    const normal = grey100;
    return (
        <Col alignItems='center'>
            <Block color={grey100} fontSize='200%'>{props.stat}</Block>
            <Block color={normal} fontSize='125%'>{props.display}</Block>
        </Col>
    );
};

const StatCard = (props) => {
    const statVal = props.stats[props.stat].value;
    const statMod = displaySign(props.stats[props.stat + 'Mod'].value);
    const card = (
        <LabeledCard
            color={props.color}
            labelWidth={px(0.75*statCardHeight)}
            label={<CardLabel stat={statVal} display={statMod} />}
        >
            <Block textTransform='capitalize'>{props.stat}</Block>
        </LabeledCard>
    );

    const dialog = (
        <Col alignItems='center' justifyContent='flex-start'>
            <Block fontSize='300%'>
                {statVal}
            </Block>
            <NiceHR />
            <StatBreakdown stats={props.stats} stat={props.stat} />
            {props.additionalContent || <div></div>}
        </Col>
    );

    return (
        <ElementWithDialog
            element={card}
            dialogTitle={props.stat}
            dialogColor={props.color}
            dialogContents={dialog}
        />
    );
};
export default StatCard;
