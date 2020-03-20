import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { THEME } from "../../THEME";

export const ThinText = ({ style, children }) => {
    return (
        <View>
            <Text style={ { ...styles.default, ...style } }>
                { children }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        color: THEME.WHITE_COLOR,
        fontFamily: 'roboto-thin',
    }
});