import React from 'react';
import PropTypes from 'prop-types';
import Col from 'jsxstyle/Col';
import Row from 'jsxstyle/Row';
import Block from 'jsxstyle/Block';
import Inline from 'jsxstyle/Inline';

const Link = ({href, children}) => (
    <Inline component='a' props={{href: href}}
        color='#ff5252'
        textDecoration='none'
    >{children}</Inline>
);
const Content = ({children}) => (
    <Block component='p' textAlign='center' marginTop='0'>
        {children}
    </Block>
);

const Title = ({children}) => (
    <Block component='h1'
        fontSize='24px'
        fontWeight='400'
        marginBottom='3px'
    >{children}</Block>
);
Title.propTypes = {
    children: PropTypes.string.isRequired,
};

const Blurb = ({title, link, children}) => (
    <Col alignItems='center' maxWidth='300px' padding='16px'>
        <Title>{title}</Title>
        <Content>{children}</Content>
        <Link href={link.href}>{link.text}</Link>
    </Col>
);
Blurb.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.string.isRequired,
};

const Blurbs = ({style}) => (
    <Row flexWrap='wrap' style={style} justifyContent='space-around'>
        <Blurb
            title='Guide'
            link={{href: '/guide', text: 'VIEW GUIDE'}}>
            Learn how your class gives you features,
            those features have effects,
            and those effects determine your stats.
        </Blurb>
        <Blurb
            title={'Discuss'}
            link={{href: 'http://www.reddit.com/r/dicecloud/',
                text: '/R/DICECLOUD'}}>
            On the official subreddit
        </Blurb>
        <Blurb
            title={'Get involved'}
            link={{href: 'https://trello.com/b/94M0SCnq/dicecloud-roadmap',
                text: 'TRELLO ROADMAP'}}>
            Shape upcoming features and track bugs on the Dice Cloud Trello board
        </Blurb>
    </Row>
);
export default Blurbs;
