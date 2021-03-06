import React, { useState } from 'react';
import { StyleSheet, View, Alert, Keyboard } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { AppScreen } from "../Components/UI/AppScreen";
import { AppButton } from '../Components/UI/AppButton'
import { InputForm } from '../Components/UI/InputForm'
import { Header } from '../Components/UI/Header';
import { QRModalWindow } from "../Components/ModalWindows/QRModalWindow";
import { SelectWalletModalWindow } from "../Components/ModalWindows/SelectWalletModalWindow";
import { RegularText } from "../Components/UI/RegularText";

export const QRCodeAddScreen = ({ walletData, onHomePress, title, addTransaction }) => {
    const [walletSelected, setWalletSelected] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [walletsListVisibility, setWalletsListVisibility] = useState(false);
    const [visible, setVisibility] = useState(false);
    const [amount, setAmount] = useState('');

    const pay = () => {
        if(wallet) {
            if (amount !== '') {
                setVisibility(true);
                Keyboard.dismiss();
            } else {
                Alert.alert('Пожалуйста, укажите сумму');
            }
        } else {
            Alert.alert('Пожалуйста, выберите кошелёк');
        }
    };

    const clear = () => {
        setAmount('');
        setWallet(null);
        setWalletSelected(false);
        Keyboard.dismiss();
    };

    const walletSelection = !walletSelected ? (
            <>
                <RegularText style={ styles.walletSelectText }>
                    { 'Выберите кошелёк' }
                </RegularText>
                <AppButton buttonStyle={ styles.walletSelectButton }
                           onPress={ () => setWalletsListVisibility(true) }>
                    <Feather name={ 'arrow-down' } size={ 20 }/>
                </AppButton>
            </>
        ) : (
        <>
            <RegularText style={ styles.walletSelectText }>
                { `Выбран:  ${ wallet.walletCurrency }` }
            </RegularText>
            <View style={ {flexDirection: 'row', alignItems: 'center'} }>
                <RegularText style={ styles.walletSelectText }>
                    { `Изменить:  ` }
                </RegularText>
                <AppButton buttonStyle={ styles.walletSelectButton }
                           onPress={ () => setWalletsListVisibility(true) }>
                    <Feather name={ 'arrow-down' } size={ 20 }/>
                </AppButton>
            </View>

        </>
    );

    const modal = visible ? <QRModalWindow qrData={ wallet }
                                           setVisibility={ setVisibility }
                                           visible={ visible }
                                           clear={ clear }
                                           amount={ amount }
                                           addTransaction={ addTransaction }
    /> : null;

    return (
        <AppScreen>
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            <View style={ styles.container }>
                <View style={ styles.walletSelectContainer }>
                    { walletSelection }
                </View>
                <SelectWalletModalWindow walletData={ walletData }
                                         setWallet={ setWallet }
                                         visible={ walletsListVisibility }
                                         setVisibility={ setWalletsListVisibility }
                                         setWalletSelected={ setWalletSelected }
                                         onHomePress={ onHomePress }
                />
                <InputForm placeholder={ 'Введите сумму отплаты в рублях' }
                           keyboardType={ 'numeric' }
                           value={ amount }
                           onChangeText={ setAmount }/>
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
    walletSelectContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    walletSelectText: {

    },
    walletSelectButton: {
        width: 50
    },
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