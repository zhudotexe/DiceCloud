import React from 'react';
import Radium from 'radium';
import Flexbox from '../../Flexbox.jsx';

const Blurb = ({title, href, link, children}) => (
    <Flexbox dir='column' alignItems='center' style={styles.blurb}>
        <h1 style={styles.blurb.title}>{title}</h1>
        <p style={styles.blurb.text}>{children}</p>
        <a href={link.href} style={styles.blurb.link}>{link.text}</a>
    </Flexbox>
);

const Blurbs = ({style}) => (
    <Flexbox flexWrap='wrap' style={style} justifyContent='space-around'>
        <Blurb
            title={'Check out the guide'}
            href={'/guide'}
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
    </Flexbox>
);
export default Radium(Blurbs);
var styles = {
    blurb: {
        maxWidth: '300px',
        padding: '16px',
        title: {
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '3px',
        },
        text: {
            textAlign: 'center',
            marginTop: 0,
        },
        link: {
            color: '#ff5252',
            textDecoration: 'none',
        },
    },
};

