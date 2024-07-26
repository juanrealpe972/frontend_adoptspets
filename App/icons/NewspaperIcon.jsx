import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NewspaperIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20 6H4v14h16V6zm0-2v2H4V4h16zM8 8h8v2H8V8zm0 4h8v2H8v-2zm-2 6H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V8h2v2zm12 8H8v-2h10v2zm0-4H8v-2h10v2zm0-4H8V8h10v2z" fill={color} />
    </Svg>
);

export default NewspaperIcon;
