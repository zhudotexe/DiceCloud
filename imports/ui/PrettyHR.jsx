import React from 'react';
import Block from 'jsxstyle/Block';
import { grey100 } from 'material-ui/styles/colors.js';

import { px, margin } from '../defines.js';

const PrettyHR = () => (
    <Block component='hr'
        width='100%'
        borderColor={grey100}
        borderStyle='solid'
        marginBottom={px(3 * margin)}
    />
);
export default PrettyHR;
