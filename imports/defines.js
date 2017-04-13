import { grey100 } from 'material-ui/styles/colors.js';

export const statCardHeight = 88;
export const margin = 8;
export const px = (width) => width + 'px';
export const displaySign = (x) => (x >= 0 ? '+' : '−') + Math.abs(x);
export const operations = [ 'base', 'mult', 'add' ];
export const hrStyle = {
    width: '100%',
    borderColor: grey100,
    borderStyle: 'solid',
    marginBottom: px(3 * margin),
};

