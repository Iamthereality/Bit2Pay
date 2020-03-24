import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { CurrencySelect } from "./CurrencySelect";
import { AppButton } from "./UI/AppButton";
import { InputForm } from "./UI/InputForm";

export const AddForm = ({ setIsReadyToAdd, setWalletData }) => {
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
        if (currency !== null && id !== null && publicKey !== null && privateKey !== null) {
            setWalletData((prevState) => [
                ...prevState,
                {
                    walletCurrency: currency,
                    walletID: id,
                    walletPublicKey: publicKey,
                    walletPrivateKey: privateKey
                    // walletID: 'PRIZM-6XVX-S5KU-H35H-A38YM',
                    // walletPublicKey: 'ID-8f0826912bb84d4cbb39ab74284016b9d988fe6b7dd44c529a55b8a42d2531cc',
                    // walletPrivateKey: 'b28b30c9a28346eea218e39d62ec422ab4b398096bb74a2c99d595d17c0f7982'
                }
            ]);
            setIsReadyToAdd(false);
        } else {
            Alert.alert(`Заполните все обязательные поля`);
        }
    };

    return (
        <>
            <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
            <InputForm placeholder={ 'Введите ID кошелька' } value={ id } onChangeText={ setID }/>
            <InputForm placeholder={ 'Введите публичный ключ' } value={ publicKey } onChangeText={ setPublicKey }/>
            <InputForm placeholder={ 'Введите приватный ключ' } value={ privateKey } onChangeText={ setPrivateKey }/>
            <View style={ styles.buttonContainer }>
                <AppButton buttonStyle={ styles.button } onPress={ clear }>
                    { 'Сброс' }
                </AppButton>
                <AppButton buttonStyle={ styles.button } onPress={ () => setUser() }>
                    { 'Готово' }
                </AppButton>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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