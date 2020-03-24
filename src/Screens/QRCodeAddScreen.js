import React, { useState } from 'react';
import { StyleSheet, View, Alert, Keyboard } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { AppButton } from '../Components/UI/AppButton'
import { InputForm } from '../Components/UI/InputForm'
import { Header } from '../Components/UI/Header';
import { QRModalWindow } from "../Components/QRModalWindow";
import { SelectWallet } from "../Components/SelectWallet";

export const QRCodeAddScreen = ({ walletData, onHomePress, title }) => {
    const [wallet, setWallet] = useState({});
    const [walletsListVisibility, setWalletsListVisibility] = useState(false);
    const [visible, setVisibility] = useState(false);
    const [amount, setAmount] = useState('');

    const pay = () => {
        if (amount !== '') {
            setVisibility(true);
            Keyboard.dismiss();
        } else {
            Alert.alert('Пожалуйста, укажите сумму');
        }
    };

    const clear = () => {
        setAmount('');
        Keyboard.dismiss();
    };

    const modal = visible ? <QRModalWindow qrData={ wallet } setVisibility={ setVisibility } visible={ visible } clear={ clear }/> : null;
    return (
        <AppScreen>
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            <View style={ styles.container }>
                <AppButton onPress={ () => setWalletsListVisibility(true) }>
                    { 'Выберите кошелёк' }
                </AppButton>
                <SelectWallet walletData={ walletData }
                              setWallet={ setWallet }
                              visible={ walletsListVisibility }
                              setVisibility={ setWalletsListVisibility }
                />
                <InputForm placeholder={ 'Введите сумму' } keyboardType={ 'numeric' } value={ amount } onChangeText={ setAmount }/>
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