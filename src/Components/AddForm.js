import React, { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';

import { CurrencySelect } from "./CurrencySelect";
import { AppButton } from "./UI/AppButton";
import { InputForm } from "./UI/InputForm";

export const AddForm = ({ setIsReadyToAdd, setWalletData, setWallet }) => {
    const [currency, setCurrency] = useState(null);
    const [address, setAddress] = useState(null);
    const [prizmID, setPrizmID] = useState(null);

    const clear = () => {
        setAddress(null);
        setPrizmID(null);
        Keyboard.dismiss();
    };

    const cancel = () => {
        setCurrency(null);
        setAddress(null);
        setPrizmID(null);
    };

    const addWallet = () => {
        if (currency === 'Ethereum' || currency === 'Bitcoin') {
            if (address !== null) {
                setWalletData((prevState) => {
                    if (prevState) {
                        setWallet([
                            {
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            },
                            ...prevState
                        ]);
                        return [
                            {
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            },
                            ...prevState
                        ]
                    } else {
                        setWallet([
                            {
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            }
                        ]);
                        return [
                            {
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            }
                        ]
                    }
                });
                setIsReadyToAdd(false);
            } else {
                Alert.alert(`Заполните адрес кошелька`);
            }
        } else if (currency === 'Prizm') {
            if (address !== null && prizmID !== null) {
                setWalletData((prevState) => {
                    if (prevState) {
                        setWallet([
                            {
                                prizmID: prizmID,
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            },
                            ...prevState
                        ]);
                        return [
                            {
                                prizmID: prizmID,
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            },
                            ...prevState
                        ]
                    } else {
                        setWallet([
                            {
                                prizmID: prizmID,
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            }
                        ]);
                        return [
                            {
                                prizmID: prizmID,
                                walletCurrency: currency,
                                walletAddress: address,
                                id: Date.now().toString()
                            }
                        ]
                    }
                });
                setIsReadyToAdd(false);
            } else {
                Alert.alert(`Заполните все обязательные поля`);
            }
        }
    };

    let clearButton = null;
    let content;

    if (currency === 'Ethereum' || currency === 'Bitcoin') {
        if (address !== null && address !== '') {
            clearButton =  (
                <AppButton buttonStyle={ styles.button } onPress={ clear }>
                    { 'Очистить' }
                </AppButton>
            );
        }
        content = (
            <>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
                <InputForm placeholder={ 'Адрес кошелька' } value={ address } onChangeText={ setAddress }/>
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button } onPress={ cancel }>
                        { 'Отмена' }
                    </AppButton>
                    { clearButton }
                    <AppButton buttonStyle={ styles.button } onPress={ addWallet }>
                        { 'Сохранить' }
                    </AppButton>
                </View>
            </>
        );
    }

    if (currency === 'Prizm') {
        if ((address !== null && address !== '') || (prizmID !== null && prizmID !== '')) {
            clearButton =  (
                <AppButton buttonStyle={ styles.button } onPress={ clear }>
                    { 'Очистить' }
                </AppButton>
            );
        }
        content = (
            <>
                <CurrencySelect label={ 'Выберите валюту' } setCurrency={ setCurrency } currency={ currency }/>
                <InputForm placeholder={ 'ID кошелька' } value={ prizmID } onChangeText={ setPrizmID }/>
                <InputForm placeholder={ 'Публичный ключ' } value={ address } onChangeText={ setAddress }/>
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button } onPress={ cancel }>
                        { 'Отмена' }
                    </AppButton>
                    { clearButton }
                    <AppButton buttonStyle={ styles.button } onPress={ addWallet }>
                        { 'Сохранить' }
                    </AppButton>
                </View>
            </>
        );
    }

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