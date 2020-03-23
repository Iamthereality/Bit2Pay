import React, { useState } from 'react';
import { StyleSheet, View, Alert, Keyboard } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { AppButton } from '../Components/UI/AppButton'
import { InputForm } from '../Components/InputForm'
import { CurrencySelect } from '../Components/CurrencySelect';
import { Header } from '../Components/UI/Header';
import { ModalWindow } from "../Components/ModalWindow";

export const QRCodeAddScreen = ({ onHomePress, title }) => {
    const [currency, setCurrency] = useState(null);
    const [visible, setVisibility] = useState(false);
    const [amount, setAmount] = useState('');

    const pay = () => {
        if (currency) {
            if (amount !== '') {
                setVisibility(true);
                Keyboard.dismiss();
            } else {
                Alert.alert('Пожалуйста, укажите сумму');
            }
        } else {
            Keyboard.dismiss();
            Alert.alert('Пожалуйста, выберите валюту');
        }
    };

    const clear = () => {
        setCurrency(null);
        setAmount('');
        Keyboard.dismiss();
    };

    const modal = visible ? <ModalWindow qrData={ amount } setVisibility={ setVisibility } visible={ visible } clear={ clear }/> : null;
    return (
        <AppScreen>
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            <View style={ styles.container }>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
                <InputForm placeholder={ 'Введите сумму' } keyboardType={ 'numeric' } amount={ amount } setAmount={ setAmount }/>
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button }
                               onPress={ clear }>
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