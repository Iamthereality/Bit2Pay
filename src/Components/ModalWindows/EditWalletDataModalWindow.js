import React, { useState } from 'react';
import { Modal, View, StyleSheet, Alert } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { AppButton } from "../UI/AppButton";
import { THEME } from "../../THEME";
import { RegularText } from "../UI/RegularText";
import { InputForm } from "../UI/InputForm";
import { ThinText } from "../UI/ThinText";

export const EditWalletDataModalWindow = ({ setVisibility, wallet, visible, updateWalletData, deleteWalletData }) => {
    const [address, setAddress] = useState(wallet.walletAddress);
    const [prizmID, setPrizmID] = useState(() => {
        if (wallet.prizmID !== null) {
            return wallet.prizmID
        } else {
            return null;
        }
    });
    let content;

    const save = () => {
        if (wallet.walletCurrency === 'Ethereum' || wallet.walletCurrency === 'Bitcoin') {
            if (address !== '') {
                updateWalletData(wallet.id, address);
                setVisibility(false);
            } else if (address === '') {
                Alert.alert('Заполните поле "Адрес"!');
            }
        } else if (wallet.walletCurrency === 'Prizm') {
            if (address !== '' && prizmID !== '') {
                updateWalletData(wallet.id, address, prizmID);
                setVisibility(false);
            } else if (address === '' && prizmID !== '') {
                Alert.alert('Заполните поле "Публичный ключ кошелька"!');
            } else if (prizmID === '' && address !== '') {
                Alert.alert('Заполните поле "ID кошелька"!');
            } else if (prizmID === '' && address === '') {
                Alert.alert('Заполните все обязательные поля!');
            }
        }
    };

    const clear = () => {
        setAddress('');
        setPrizmID('')
    };

    const close = () => {
        setAddress(wallet.walletAddress);
        setPrizmID(wallet.prizmID);
        setVisibility(false);
    };

    if (wallet.walletCurrency === 'Ethereum' || wallet.walletCurrency === 'Bitcoin') {
        content = (
            <>
                <ThinText>
                    { `Адрес кошелька ${wallet.walletCurrency}` }
                </ThinText>
                <InputForm value={ address } onChangeText={ setAddress } placeholder={ address }/>
            </>
        );
    }
    if (wallet.walletCurrency === 'Prizm') {
        content = (
            <>
                <ThinText>
                    { `ID кошелька ${wallet.walletCurrency}` }
                </ThinText>
                <InputForm value={ prizmID } onChangeText={ setPrizmID } placeholder={ prizmID }/>
                <ThinText>
                    { `Публичный ключ кошелька ${wallet.walletCurrency}` }
                </ThinText>
                <InputForm value={ address } onChangeText={ setAddress } placeholder={ address }/>
            </>
        );
    }

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { `Редактировать` }
                    </RegularText>
                    <AppButton buttonStyle={ styles.closeButton }
                               onPress={ close }>
                        <AntDesign name={ 'close' } size={ 20 }/>
                    </AppButton>
                </View>
                <View style={ styles.inputContainer }>
                    <View>
                        { content }
                    </View>
                </View>
                <View style={ styles.buttonContainer }>
                    <AppButton  buttonStyle={ styles.button }
                                onPress={ clear }>
                        { `Очистить` }
                    </AppButton>
                    <AppButton  buttonStyle={ styles.button }
                                onPress={ () => deleteWalletData(wallet.id) }>
                        { `Удалить` }
                    </AppButton>
                    <AppButton  buttonStyle={ styles.button }
                                onPress={ save }>
                        { `Сохранить` }
                    </AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closeButton: {
        width: 50,
        borderColor: 'transparent'
    },
    container: {
        paddingTop: 20,
        padding: 20,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME.BLACK_COLOR
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        width: '30%'
    }
});