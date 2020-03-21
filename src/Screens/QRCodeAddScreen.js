import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { AppButton } from '../Components/UI/AppButton'
import { InputForm } from '../Components/UI/InputForm'
import { CurrencySelect } from '../Components/CurrencySelect';
import { Header } from '../Components/UI/Header';
import { ModalWindow } from "../Components/ModalWindow";

export const QRCodeAddScreen = ({ onHomePress, title }) => {
    const [currency, setCurrency] = useState(null);
    const [visible, setVisibility] = useState(false);

    const pay = () => {
        if (currency) {
            setVisibility(true);
        } else {
            Alert.alert('Пожалуйста, выберите валюту');
        }
    };

    const modal = visible ? <ModalWindow qrData={ currency } setVisibility={ setVisibility } visible={ visible }/> : null;
    return (
        <AppScreen>
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            <View style={ styles.container }>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
                <InputForm placeholder={ 'Введите сумму' } keyboardType={ 'numeric' } />
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button }>
                        { 'Сброс' }
                    </AppButton>
                    <AppButton buttonStyle={ styles.button }
                               onPress={ pay }>
                        { 'Оплата' }
                    </AppButton>
                </View>
                { modal }
            </View>
        </AppScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '40%'
    }
});