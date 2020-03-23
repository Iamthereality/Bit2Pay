import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { THEME } from "../THEME";
import { AppButton } from "./UI/AppButton";
import { RegularText } from "./UI/RegularText";

export const CurrencySelect = ({ setCurrency, label, currency }) => {

    let prizm = (
        <AppButton buttonStyle={ styles.button }
                   onPress={ () => setCurrency('prizm') }>
            { 'PZM' }
        </AppButton>
    );

    let ethereum = (
        <AppButton buttonStyle={ styles.button }
                   onPress={ () => setCurrency('ethereum') }>
            <MaterialCommunityIcons name={ 'ethereum' } size={ 20 }/>
        </AppButton>
    );

    let bitcoin = (
        <AppButton buttonStyle={ styles.button }
                   onPress={ () => setCurrency('bitcoin')}>
            <FontAwesome name={ 'bitcoin' } size={ 20 }/>
        </AppButton>
    );

    if (currency === 'prizm') {
        prizm = (
            <AppButton buttonStyle={ styles.buttonSelected }
                       onPress={ () => setCurrency('prizm') }>
                { 'PZM' }
            </AppButton>
        );
    }

    if (currency === 'ethereum') {
        ethereum = (
            <AppButton buttonStyle={ styles.buttonSelected }
                       onPress={ () => setCurrency('ethereum') }>
                <MaterialCommunityIcons name={ 'ethereum' } size={ 20 }/>
            </AppButton>
        );
    }

    if (currency === 'bitcoin') {
        bitcoin = (
            <AppButton buttonStyle={ styles.buttonSelected }
                       onPress={ () => setCurrency('bitcoin')}>
                <FontAwesome name={ 'bitcoin' } size={ 20 }/>
            </AppButton>
        );
    }

    return (
        <View style={ styles.container }>
            <RegularText style={ styles.title }>
                { label }
            </RegularText>
            { prizm }
            { ethereum }
            { bitcoin }
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