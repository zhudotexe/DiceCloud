import React, { Component } from 'react';
import InlineBlock from 'jsxstyle/InlineBlock';
import Block from 'jsxstyle/Block';
import { px, margin, operations } from '../../../defines.js';

const Contribution = (props) => (
    <Block marginBottom={px(margin)} props={{style: props.style}}>
        <InlineBlock width='6em' textAlign='right'>{props.contrib.from}</InlineBlock>
        <InlineBlock width='3em' textAlign='right'>{props.contrib.get}</InlineBlock>
    </Block>
);

const flatten = (nested) => [].concat.apply([], nested);
const StatBreakdown = (props) => {
    const stat = props.stats[props.stat];
    const matchingContributions = (action) => stat.contrib.filter(x => x.action === action);
    const contributions = flatten(operations.map(action => matchingContributions(action)));
    return (
        <div style={{width: '100%'}}>
            {contributions.map(contrib => (
                <Contribution
                    key={contrib.from}
                    contrib={contrib}
                />
            ))}
            <Contribution
                style={{fontWeight: 'bold'}}
                contrib={{from: 'Total', get: stat.value}}
            />
        </div>
    );
};
export default StatBreakdown;
