import React from 'react';
import Row from 'jsxstyle/Row';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import SvgIcon from 'material-ui/SvgIcon';
import { Card } from 'material-ui/Card';
import { grey600, lightBlue500, teal500, deepOrange500, purple500, pink500, indigo500, red500, grey100, green500 } from 'material-ui/styles/colors.js';

import { px, statCardHeight, margin, displaySign } from '../../../defines.js';
import LabeledCard from '../../LabeledCard.jsx';

import CarryingAndJumping from './CarryingAndJumping.jsx';
import StatCard from './StatCard.jsx';

const HPCardLabel = (props) => (
    <Col alignItems='center' color={grey100}>
        <div>Hit Points</div>
        <div>(Max {props.max})</div>
    </Col>
);
const HPCard = (props) => (
    <LabeledCard
        color={green500}
        label={<HPCardLabel max={props.stats.maximumHP.value} />}
    >
        <Slider min={0} max={props.stats.maximumHP.value} step={1} value={props.stats.currentHP}
            style={{flexGrow: '1', margin: px(margin)}}
            sliderStyle={{marginTop: '0', marginBottom: '0', color: green500}}
        />
        <TextField
            value={props.stats.currentHP}
            name='currentHP'
            style={{width: '3rem', marginRight: px(margin)}}
            inputStyle={{textAlign: 'center'}}
        />
    </LabeledCard>
);
const SmallStatCard = (props) => (
    <LabeledCard
        color={props.color}
        label={<Block color={grey100} fontSize='200%'>{props.label}</Block>}
        height={px(0.8*statCardHeight)}
    > {props.name} </LabeledCard>
);
const Proficiency = (props) => {
    const proficiency = props.proficiencies[props.skill];
    const mult = proficiency ? proficiency.mult : 0;
    const value = props.stats[props.mod].value + Math.floor(props.stats.proficiencyBonus.value * mult);
    const fill = mult == 1 ? grey600 : 'white';
    return (
        <Row marginLeft={px(margin)} marginBottom={px(margin)} alignItems='center'>
            <SvgIcon style={{marginRight: px(margin)}}>
                <circle cx='12' cy='12' r='10' stroke={grey600} strokeWidth={2} fill={fill} />
            </SvgIcon>
            <div style={{marginRight: px(margin)}}>{displaySign(value)}</div>
            <div style={{textTransform: 'capitalize'}}>{props.text}</div>
        </Row>
    );
};
const SavingThrow = (props) => (
    <Proficiency
        skill={props.stat + 'SavingThrow'}
        mod={props.stat + 'Mod'}
        text={props.stat}
        stats={props.stats}
        proficiencies={props.proficiencies}
    />
);
const Skill = (props) => (
    <Proficiency
        skill={props.skill}
        mod={props.stat + 'Mod'}
        text={props.skill.replace(/([A-Z])/g, ' $1').toLowerCase()}
        stats={props.stats}
        proficiencies={props.proficiencies}
    />
);
const skills = [
    {   name: 'acrobatics',
        stat: 'dexterity',
    },{ name: 'animalHandling',
        stat: 'wisdom',
    },{ name: 'arcana',
        stat: 'intelligence',
    },{ name: 'athletics',
        stat: 'strength',
    },{ name: 'deception',
        stat: 'charisma',
    },{ name: 'history',
        stat: 'intelligence',
    },{ name: 'insight',
        stat: 'wisdom',
    },{ name: 'intimidation',
        stat: 'charisma',
    },{ name: 'investigation',
        stat: 'intelligence',
    },{ name: 'medicine',
        stat: 'wisdom',
    },{ name: 'nature',
        stat: 'intelligence',
    },{ name: 'perception',
        stat: 'wisdom',
    },{ name: 'performance',
        stat: 'charisma',
    },{ name: 'persuasion',
        stat: 'charisma',
    },{ name: 'religion',
        stat: 'intelligence',
    },{ name: 'slightOfHand',
        stat: 'dexterity',
    },{ name: 'stealth',
        stat: 'dexterity',
    },{ name: 'survival',
        stat: 'wisdom',
    },
];
const Stats = (props) => {
    return (
        <Col>
            <HPCard stats={props.stats} />
            <Row>
                <Col flexGrow={1}>
                    <StatCard stats={props.stats} stat='strength' color={red500}
                        additionalContent={<CarryingAndJumping strength={props.stats['strength'].value} />}
                    />
                    <StatCard stats={props.stats} stat='dexterity' color={indigo500} />
                    <StatCard stats={props.stats} stat='constitution' color={green500} />
                    <StatCard stats={props.stats} stat='intelligence' color={deepOrange500} />
                    <StatCard stats={props.stats} stat='wisdom' color={purple500} />
                    <StatCard stats={props.stats} stat='charisma' color={pink500} />
                </Col>
                <div style={{width: px(margin)}}></div>
                <Col flexGrow={1}>
                    <SmallStatCard label={props.stats.armorClass.value} name='Armor Class' color={teal500} />
                    <SmallStatCard label={props.stats.speed.value} name='Speed' color={teal500} />
                    <SmallStatCard label={displaySign(props.stats.dexterityMod.value)} name='Initiative' color={indigo500} />
                    <SmallStatCard label={displaySign(props.stats.proficiencyBonus.value)} name='Proficiency Bonus' color={lightBlue500} />
                    <LabeledCard
                        label={
                            <Block color={grey100}>
                                {'d'+props.stats.hitDie.value+displaySign(props.stats.constitutionMod.value)}
                            </Block>
                        }
                        color={green500}
                    > Hit Dice </LabeledCard>
                </Col>
                <div style={{width: px(margin)}}></div>
                <Col flexGrow={1}>
                    <Card>
                        <Col alignItems='stretch'>
                            <Row alignItems='center' justifyContent='center' padding='16px'>Saving Throws</Row>
                            <SavingThrow stats={props.stats} proficiencies={props.proficiencies} stat='strength' />
                            <SavingThrow stats={props.stats} proficiencies={props.proficiencies} stat='dexterity' />
                            <SavingThrow stats={props.stats} proficiencies={props.proficiencies} stat='constitution' />
                            <SavingThrow stats={props.stats} proficiencies={props.proficiencies} stat='intelligence' />
                            <SavingThrow stats={props.stats} proficiencies={props.proficiencies} stat='wisdom' />
                            <SavingThrow stats={props.stats} proficiencies={props.proficiencies} stat='charisma' />
                        </Col>
                    </Card>
                </Col>
                <div style={{width: px(margin)}}></div>
                <Col flexGrow={1}>
                    <Card>
                        <Col alignItems='stretch'>
                            <Row alignItems='center' justifyContent='center' padding='16px'>Skills</Row>
                            {skills.map(skill => (
                                <Skill
                                    key={skill.name}
                                    stats={props.stats}
                                    proficiencies={props.proficiencies}
                                    skill={skill.name}
                                    stat={skill.stat}
                                />
                            ))}
                        </Col>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
};
export default Stats;
