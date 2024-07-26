import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M16 13v-2H9V8l-5 4 5 4v-3h7zm-7 9h10V2H9v5H7V2a2 2 0 012-2h10a2 2 0 012 2v20a2 2 0 01-2 2H9a2 2 0 01-2-2v-5h2v5z" fill={color} />
    </Svg>
);

export default LogoutIcon;
