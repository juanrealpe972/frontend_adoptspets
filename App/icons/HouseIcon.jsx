import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HouseIcon = ({ size = 26, color = "grey" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} />
    </Svg>
);

export default HouseIcon;