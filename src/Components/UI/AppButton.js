import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform, View } from 'react-native';

import { ThinText } from './ThinText';
import { THEME } from "../../THEME";
import {RegularText} from "./RegularText";

export const AppButton = ({ buttonStyle, textStyle, onPress, onLongPress, children }) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={ { ...styles.button, ...styles.shadow, ...buttonStyle } }>
            <Wrapper
                activeOpacity={ 0.7 }
                onPress={ onPress }
                onLongPress={ onLongPress }
                background={TouchableNativeFeedback.Ripple(THEME.WHITE_COLOR, true)}
            >
                <View style={ { ...styles.button, ...buttonStyle, width: '100%', borderColor: 'transparent' } }>
                    <RegularText style={ textStyle }>
                        { children }
                    </RegularText>
                </View>
            </Wrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: THEME.BLACK_COLOR,
        flexDirection: 'row',
        borderRadius: 50,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderWidth: 0.5,
    },
    shadow: {
        shadowColor: THEME.WHITE_COLOR,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 5
    }
});