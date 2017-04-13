import React, { Component } from 'react';
import { px, margin, hrStyle } from '../../../defines.js';
import Row from 'jsxstyle/Row';

const CarryingAndJumping = (props) => (
    <div>
        <hr style={hrStyle}/>
        <div style={{fontSize: '150%', marginBottom: px(margin)}}>
            Carrying
        </div>
        <Row flexWrap='wrap' className='grid-three-col'>
            <div>Encumbered</div>
            <div>{'>' + 5*props.strength + 'lbs'}</div>
            <div>Variant rule: encumbered characters move 10 feet slower</div>

            <div>Heavily Encumbered</div>
            <div>{'>' + 10*props.strength + 'lbs'}</div>
            <div>Variant rule: heavily encumbered characters move 20
                feet slower and have disadvantage on ability checks,
                attack rolls, and saving throws that use Strength,
                Dexterity, or Constitution</div>

            <div>Push, Drag, and Lift</div>
            <div>{'>' + 15*props.strength + 'lbs'}</div>
            <div>While pushing or dragging, your speed drops to 5 feet.</div>

            <div>Movement maximum</div>
            <div>{30*props.strength + 'lbs'}</div>
            <div>Anything weighing more than this cannot even be pushed or dragged.</div>
        </Row>
        <hr style={hrStyle} />
        <div style={{fontSize: '150%', marginBottom: px(margin)}}>
            Jumping
        </div>
        <Row flexWrap='wrap' className='grid-three-col'>
            <div>Long Jump (standing)</div>
            <div>{0.5 * props.strength + 'ft'}</div>
            <div> </div>

            <div>Long Jump (running)</div>
            <div>{props.strength + 'ft'}</div>
            <div>Requires a 10ft running start on foot</div>

            <div>High Jump (standing)</div>
            <div>{0.5 * (3 + props.strength) + 'ft'}</div>
            <div> </div>

            <div>High Jump (running)</div>
            <div>{(3 + props.strength) + 'ft'}</div>
            <div>Requires a 10ft running start on foot</div>
        </Row>
        <div style={{marginBottom: px(margin)}}>
            At your DM's option, you must succeed on a DC 10 Strength
            (Athletics) check to clear an obstacle up to a quarter of
            a long jump's distance in height.
        </div>
        <div style={{marginBottom: px(margin)}}>
            If you land in difficult terrain, you must succeed on a
            DC 10 Dexterity (Acrobatics) check to land on your feet.
            Otherwise, you land prone.
        </div>
        <div style={{marginBottom: px(margin)}}>
            In some circumstances, your DM may allow you to make a
            Strength (Athletics) check to jump higher than you
            normally can.
        </div>
        <div style={{marginBottom: px(margin)}}>
            If you extend your arms, you can reach a distance 1.5
            times your height above the jump height above (for
            example, to grab a ledge or dangling rope).
        </div>
    </div>
);
export default CarryingAndJumping;
