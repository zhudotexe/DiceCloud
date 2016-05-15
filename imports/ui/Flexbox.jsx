import React from 'react';
import Radium from 'radium';

class Flexbox extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <div style={[{
                display: this.props.display,
                alignContent: this.props.alignContent,
                alignItems: this.props.alignItems,
                alignSelf: this.props.alignSelf,
                flexBasis: this.props.flexBasis,
                flexDirection: this.props.dir || this.props.flexDirection,
                flexGrow: this.props.flexGrow,
                flexShrink: this.props.flexShrink,
                flexWrap: this.props.flexWrap,
                justifyContent: this.props.justifyContent,
                order: this.props.order,
            }, this.props.style]}>
                {this.props.children}
            </div>
        );
    }
}
Flexbox.propTypes = {
    display: React.PropTypes.oneOf(['flex','inline-flex']),
    alignContent: React.PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']),
    alignItems: React.PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    alignSelf: React.PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    flexBasis: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    flexDirection: React.PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    dir: React.PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    flexGrow: React.PropTypes.number,
    flexShrink: React.PropTypes.number,
    flexWrap: React.PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
    justifyContent: React.PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
    order: React.PropTypes.number,
    style: React.PropTypes.object,
};
Flexbox.defaultProps = {
    display: 'flex',
    alignContent: 'stretch',
    alignItems: 'stretch',
    alignSelf: 'auto',
    flexBasis: 'auto',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 1,
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    order: 0,
};
export default Radium(Flexbox);

