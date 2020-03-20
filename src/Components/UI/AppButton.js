import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform, View } from 'react-native';

import { ThinText } from './ThinText';
import { THEME } from "../../THEME";

export const AppButton = ({ buttonStyle, textStyle, onPress, onLongPress, children }) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={ { ...styles.button, ...buttonStyle } }>
            <Wrapper activeOpacity={ 0.7 }
                     onPress={ onPress }
                     onLongPress={ onLongPress }
                     background={TouchableNativeFeedback.Ripple(THEME.WHITE_COLOR, true)}
            >
                <View style={ { ...styles.button, ...buttonStyle, width: '100%', borderColor: 'transparent' } }>
                    <ThinText style={ textStyle }>
                        { children }
                    </ThinText>
                </View>
            </Wrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderRadius: 50,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: THEME.WHITE_COLOR,
        borderWidth: 0.5,
    }
});