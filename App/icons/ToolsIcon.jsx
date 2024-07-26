import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ToolsIcon = ({ size = 30, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-.5 13h1v-1h-1v1zm0-2h1v-1h-1v1zm.5-5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0 1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v-1c0-.55-.45-1-1-1z" fill={color} />
    </Svg>
);

export default ToolsIcon;
