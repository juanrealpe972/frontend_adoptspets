// HelpIcon.jsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HelpIcon = ({ size = 30, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.88-3.5h1.75v-1.75h-1.75v1.75zM12 7c-1.23 0-2.25 1.02-2.25 2.25h1.75c0-.28.22-.5.5-.5s.5.22.5.5c0 .55-.45 1-1 1-.83 0-1.5.67-1.5 1.5h1.75c0-.28.22-.5.5-.5s.5.22.5.5c0 .55-.45 1-1 1v1.75h1.75V13c0-1.23-1.02-2.25-2.25-2.25-.28 0-.5-.22-.5-.5s.22-.5.5-.5c.55 0 1-.45 1-1s-.45-1-1-1z" fill={color} />
    </Svg>
);

export default HelpIcon;
