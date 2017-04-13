import React, { Component } from 'react';
import { grey100 } from 'material-ui/styles/colors.js';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back.js';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Row from 'jsxstyle/Row';

import { margin, px } from '../../../defines.js';

export default class ElementWithDialog extends Component {
    state = {
        dialogOpen: false,
    };

    handleOpen = () => {
        this.setState({dialogOpen: true});
    };

    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const titleBar = (
            <Row alignItems='center'>
                <IconButton onTouchTap={this.handleClose}>
                    <ArrowBack
                        style={styles.arrow}
                        color={grey100}
                    />
                </IconButton>
                <div>
                    {this.props.dialogTitle}
                </div>
            </Row>
        );
        return (
            <div>
                <div style={styles.element} onTouchTap={this.handleOpen}>
                    {this.props.element}
                </div>
                <Dialog
                    title={titleBar}
                    titleStyle={styles.title(this.props.dialogColor)}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    autoDetectWindowHeight={false}
                >
                    <div style={{height: px(3 * margin)}}></div>
                    {this.props.dialogContents}
                </Dialog>
            </div>
        );
    }
}
const styles = {
    arrow: {
        marginRight: px(3 * margin),
    },
    element: {
        cursor: 'pointer',
    },
    title: (color) => ({
        color: grey100,
        backgroundColor: color,
        textTransform: 'capitalize',
        height: '72px',
    }),
};

