import React from 'react';
import Col from 'jsxstyle/Col';
import { grey300, grey900 } from 'material-ui/styles/colors';

import Splash from './home/Splash.jsx';
import DemoSheets from './home/DemoSheets.jsx';
import Blurbs from './home/Blurbs.jsx';

class Home extends React.Component {
    render() {
        return (
            <Col width='100%'>
                <Splash style={styles.dark} />
                <DemoSheets style={styles.light} />
                <Blurbs style={styles.dark} />
            </Col>
        );
    }
}
export default Home;

var styles = {
    light: {
        color: grey900,
        backgroundColor: grey300,
        padding: '36px',
    },
    dark: {
        color: grey300,
        backgroundColor: grey900,
        padding: '36px',
    },
};
