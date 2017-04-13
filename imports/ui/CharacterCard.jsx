import React from 'react';
import PropTypes from 'prop-types';
import Inline from 'jsxstyle/Inline';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { grey100 } from 'material-ui/styles/colors.js';

const Link = (props) => (
    <Inline component='a' props={{href: props.href}} textDecoration='none'>
        {props.children}
    </Inline>
);
Link.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node,
};

const CharacterCard = (props) => {
    const { character, linkStyle, ...rest } = props;
    const text = [character.alignment, character.gender, character.race.name]
        .filter(str => str) // take out undefineds
        .join(' ');

    return (
        <Link href={'/character/' + character.uid}>
            <Card {...rest}>
                <CardHeader
                    style={{backgroundColor: character.color}}
                    title={character.name}
                    titleStyle={{color: grey100}}
                />
                <CardText>{text}</CardText>
            </Card>
        </Link>
    );
};
export default CharacterCard;
