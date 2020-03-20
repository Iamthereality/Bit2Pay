import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { ThinText } from "../Components/UI/ThinText";
import { AppButton } from '../Components/UI/AppButton'
import { InputForm } from '../Components/UI/InputForm'

export const QRCodeAddScreen = ({ title }) => {
    return (
        <AppScreen>
            <ThinText style={ styles.header }>
                { title }
            </ThinText>
            <View style={ styles.container }>
                <InputForm placeholder={ 'Введите сумму' } keyboardType={ 'numeric' } />
            </View>
        </AppScreen>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        marginBottom: 20
    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        height: 40
    }
});