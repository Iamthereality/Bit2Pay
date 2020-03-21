import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { ThinText } from "../Components/UI/ThinText";

export const MainScreen = ({ style, title }) => {
    const spinValue = new Animated.Value(0);

    Animated.loop(Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 9000,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    });

    return (
        <AppScreen style={ style } >
            <ThinText style={ { fontSize: 22 } }>
                { title }
            </ThinText>
            <View style={ styles.greetings }>
                <View style={ styles.image_wrap }>
                    <Animated.Image style={ { ...styles.image, transform: [{rotate: spin}] } }
                                    source={ require('../../assets/prizm_logo.png') }
                    />
                </View>
            </View>
            <View style={ styles.tips }>
                <ThinText style={ styles.tipsText }>
                    { 'Оплата' }
                </ThinText>
                <ThinText style={ styles.tipsText }>
                    { 'История' }
                </ThinText>
                <ThinText style={ styles.tipsText }>
                    { 'Кошелёк' }
                </ThinText>
            </View>
        </AppScreen>
    );
};

const styles = StyleSheet.create({
    image_wrap: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: '100%'
    },
    image: {
        resizeMode: 'contain',
        width: 250,
        height: 250
    },
    greetings: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    tips: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tipsText: {
        width: 110,
        textAlign: 'center'
    }
});