import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NotificacionesIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6V10c0-3.31-2.69-6-6-6S6 6.69 6 10v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.72 2.2-4.94 5-5.16V5c0-.55.45-1 1-1s1 .45 1 1v1.84c2.8.22 5 2.44 5 5.16v6z" fill={color} />
    </Svg>
);

export default NotificacionesIcon;
