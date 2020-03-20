import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export const AppScreen = ({ style, children}) => {
    return (
        <View style={ {...styles.appScreen, ...style} }>
            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    appScreen: {
        paddingTop: 40,
        paddingHorizontal: 15,
        paddingBottom: 15,
        width: '100%',
        height: Dimensions.get('window').height - 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});