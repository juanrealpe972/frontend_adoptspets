import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const EnergyCircle = ({ energyLevel }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * energyLevel) / 10;

    return (
        <View style={styles.container}>
            <Svg height="25" width="25" viewBox="0 0 120 120">
                <Circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#E89551"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </Svg>
            <Text style={styles.energyText}>Energía: {energyLevel}/10</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    energyText: {
        marginTop: 2,
        fontSize: 13,
        color: '#666',
    },
});

export default EnergyCircle;
