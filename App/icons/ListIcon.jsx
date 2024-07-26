import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ListIcon = ({ size = 26, color = "#FFF" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M3 13h18v-2H3v2zm0 6h18v-2H3v2zm0-14v2h18V5H3z" fill={color} />
    </Svg>
);

export default ListIcon;
