import React, { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';

import { CurrencySelect } from "./CurrencySelect";
import { AppButton } from "./UI/AppButton";
import { InputForm } from "./UI/InputForm";

export const AddForm = ({ setIsReadyToAdd, setWalletData }) => {
    const [currency, setCurrency] = useState(null);
    const [id, setID] = useState(null);
    const [publicKey, setPublicKey] = useState(null);

    const clear = () => {
        setID(null);
        setPublicKey(null);
        Keyboard.dismiss();
    };

    const cancel = () => {
        setCurrency(null);
        setID(null);
        setPublicKey(null);
    };

    const setUser = () => {
        if (currency !== null && id !== null && publicKey !== null) {
            setWalletData((prevState) => {
                if (prevState) {
                    return [
                        {
                            walletCurrency: currency,
                            walletID: id,
                            walletPublicKey: publicKey,
                            id: Date.now()
                            // walletID: 'PRIZM-6XVX-S5KU-H35H-A38YM',
                            // walletPublicKey: 'ID-8f0826912bb84d4cbb39ab74284016b9d988fe6b7dd44c529a55b8a42d2531cc',
                            // walletPrivateKey: 'b28b30c9a28346eea218e39d62ec422ab4b398096bb74a2c99d595d17c0f7982'
                        },
                        ...prevState
                    ]
                } else {
                    return [
                        {
                            walletCurrency: currency,
                            walletID: id,
                            walletPublicKey: publicKey,
                            id: Date.now()
                            // walletID: 'PRIZM-6XVX-S5KU-H35H-A38YM',
                            // walletPublicKey: 'ID-8f0826912bb84d4cbb39ab74284016b9d988fe6b7dd44c529a55b8a42d2531cc',
                            // walletPrivateKey: 'b28b30c9a28346eea218e39d62ec422ab4b398096bb74a2c99d595d17c0f7982'
                        }
                    ]
                }
            });
            setIsReadyToAdd(false);
        } else {
            Alert.alert(`Заполните все обязательные поля`);
        }
    };

    let content;

    if (currency === null) {
       content = (
            <>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>

                <View style={ { ...styles.buttonContainer, justifyContent: 'center' } }>
                    <AppButton buttonStyle={ styles.button } onPress={ () => setIsReadyToAdd(false) }>
                        { 'Назад' }
                    </AppButton>
                </View>
            </>
        );
    }

    const clearButton = (id !== null && id !== '') || (publicKey !== null && publicKey !== '') ? (
        <AppButton buttonStyle={ styles.button } onPress={ clear }>
            { 'Очистить' }
        </AppButton>
    ) : null;

    if (currency === 'Prizm') {
        content = (
            <>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
                <InputForm placeholder={ 'Введите ID кошелька' } value={ id } onChangeText={ setID }/>
                <InputForm placeholder={ 'Введите публичный ключ' } value={ publicKey } onChangeText={ setPublicKey }/>
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button } onPress={ cancel }>
                        { 'Отмена' }
                    </AppButton>
                    { clearButton }
                    <AppButton buttonStyle={ styles.button } onPress={ setUser }>
                        { 'Сохранить' }
                    </AppButton>
                </View>
            </>
        );
    }

    if (currency === 'Ethereum' || currency === 'Bitcoin') {
        content = (
            <>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
                <InputForm placeholder={ 'Введите название' } value={ id } onChangeText={ setID }/>
                <InputForm placeholder={ 'Введите адрес' } value={ publicKey } onChangeText={ setPublicKey }/>
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button } onPress={ cancel }>
                        { 'Отмена' }
                    </AppButton>
                    { clearButton }
                    <AppButton buttonStyle={ styles.button } onPress={ setUser }>
                        { 'Сохранить' }
                    </AppButton>
                </View>
            </>
        );
    }

    return (
        <>
            { content }
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
        width: '30%'
    }
});