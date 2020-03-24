import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { AppButton } from './AppButton';
import { RegularText } from './RegularText'
import {THEME} from "../../THEME";

export const Header = ({ onHomePress, children }) => {
    return (
        <View style={ styles.container }>
            <RegularText style={ styles.header }>
                { children }
            </RegularText>
            <AppButton  buttonStyle={ styles.homeButton }
                        onPress={ () => onHomePress(null) }
                        onLongPress={ () => onHomePress(null) }
            >
                <AntDesign name={ 'home' } size={ 20 }/>
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: THEME.BLACK_COLOR
    },
    homeButton: {
        borderColor: 'transparent',
        width: 50
    },
    header: {
        fontSize: 22
    }
});