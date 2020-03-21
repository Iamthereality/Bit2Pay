import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { THEME } from "../THEME";
import { AppButton } from "./UI/AppButton";
import { RegularText } from "./UI/RegularText";

export const CurrencySelect = ({ setCurrency, label, currency }) => {

    let ruble = (
        <AppButton buttonStyle={ styles.button }
                   onPress={ () => setCurrency('ruble') }>
            <FontAwesome name={ 'ruble' } size={ 20 }/>
        </AppButton>
    );

    let dollar = (
        <AppButton buttonStyle={ styles.button }
                   onPress={ () => setCurrency('dollar')}>
            <FontAwesome name={ 'dollar' } size={ 20 }/>
        </AppButton>
    );

    if (currency === 'ruble') {
        ruble = (
            <AppButton buttonStyle={ styles.buttonSelected }
                       onPress={ () => setCurrency('ruble') }>
                <FontAwesome name={ 'ruble' } size={ 20 }/>
            </AppButton>
        );
    }

    if (currency === 'dollar') {
        dollar = (
            <AppButton buttonStyle={ styles.buttonSelected }
                       onPress={ () => setCurrency('dollar')}>
                <FontAwesome name={ 'dollar' } size={ 20 }/>
            </AppButton>
        );
    }

    return (
        <View style={ styles.container }>
            <RegularText style={ styles.title }>
                { label }
            </RegularText>
            { ruble }
            { dollar }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        padding: 10,
        fontSize: 16,
        color: THEME.WHITE_COLOR,
    },
    button: {
        width: 50,
    },
    buttonSelected: {
        width: 50,
        backgroundColor: THEME.MAIN_COLOR
    }
});