import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';

import { THEME } from '../THEME';
import { CurrencySelect } from "./CurrencySelect";
import { AppButton } from "./UI/AppButton";

export const AddForm = ({ userData, setUserData }) => {
    const [currency, setCurrency] = useState(null);
    const [id, setID] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);

    const clear = () => {
        setCurrency(null);
        setID(null);
        setPublicKey(null);
        setPrivateKey(null);
    };

    const setUser = () => {
        setUserData([
            {
                walletCurrency: currency,
                walletID: 'PRIZM-6XVX-S5KU-H35H-A38YM',
                walletPublicKey: 'ID-8f0826912bb84d4cbb39ab74284016b9d988fe6b7dd44c529a55b8a42d2531cc',
                walletPrivateKey: 'b28b30c9a28346eea218e39d62ec422ab4b398096bb74a2c99d595d17c0f7982'
            }
        ]);
        console.log(userData);
        // if (currency !== null && id !== null && publicKey !== null && privateKey !== null) {
        //
        //     console.log(userData);
        // } else {
        //     Alert.alert('Заполните все обязательные поля!');
        // }
    };

    return (
        <>
            <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
            <View style={ styles.inputContainer }>
                <TextInput placeholder={ 'Введите ID кошелька' }
                           value={ id }
                           onChangeText={ (text) => setID(text) }
                           style={ styles.input }/>
            </View>
            <View style={ styles.inputContainer }>
                <TextInput placeholder={ 'Введите публичный ключ' }
                           value={ publicKey }
                           onChangeText={ (text) => setPublicKey(text) }
                           style={ styles.input }/>
            </View>
            <View style={ styles.inputContainer }>
                <TextInput placeholder={ 'Введите приватный ключ' }
                           value={ privateKey }
                           onChangeText={ (text) => setPrivateKey(text) }
                           style={ styles.input }/>
            </View>
            <View style={ styles.buttonContainer }>
                <AppButton buttonStyle={ styles.button } onPress={ clear }>
                    { 'Сброс' }
                </AppButton>
                <AppButton buttonStyle={ styles.button } onPress={ setUser }>
                    { 'Готово' }
                </AppButton>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        width: '100%',
        padding: 10,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: THEME.WHITE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        width: '95%',
        height: 30,
        color: THEME.WHITE_COLOR,
        borderBottomWidth: 0.5,
        borderBottomColor: THEME.MAIN_COLOR
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