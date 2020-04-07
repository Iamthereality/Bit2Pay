import React, { useState } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView  } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { AppScreen } from '../Components/UI/AppScreen';
import { Header } from '../Components/UI/Header';
import { AppButton } from '../Components/UI/AppButton';
import { AddForm } from '../Components/AddForm';
import { WalletsList } from '../Components/WalletsList';
import { PinCodeModalWindow } from "../Components/ModalWindows/PinCodeModalWindow";
import { EditPinCodeModalWindow } from "../Components/ModalWindows/EditPinCodeModalWindow";

export const WalletScreen = ({ onHomePress, setWalletData, walletData, title, updateWalletData, pinCode, setPinCode, deleteWalletData, setWallet }) => {
    const [isReadyToAdd, setIsReadyToAdd] = useState(false);
    const [pinPadIsVisible, setPinPadIsVisible] = useState(true);
    const [editPinScreenIsVisible, setEditPinScreenIsVisible] = useState(false);

    const addWallet = (
        <AppButton buttonStyle={ styles.button }
                   textStyle={ { fontSize: 20 } }
                   onPress={ () => setIsReadyToAdd(true) }>
            <Feather name={ 'plus' } size={ 20 }/>
            { ' адрес' }
        </AppButton>
    );


    let content, pinPad, editPin;

    if (pinCode !== null) {
        editPin = (
            <AppButton buttonStyle={ styles.button }
                       onPress={ () => setEditPinScreenIsVisible(true) }>
                { 'Сменить PIN' }
            </AppButton>
        );
        pinPad = (
            <>
                <PinCodeModalWindow setVisibility={ setPinPadIsVisible }
                                    visible={ pinPadIsVisible }
                                    pinCode={ pinCode }
                                    onHomePress={ onHomePress }/>
            </>
        );
    } else if (pinCode === null) {
        editPin = (
            <AppButton buttonStyle={ styles.button }
                       onPress={ () => setEditPinScreenIsVisible(true) }>
                { 'Задать PIN' }
            </AppButton>
        );
        pinPad = null;
    }

    if (!isReadyToAdd) {
        if (walletData.length === 0) {
            content = (
                <View style={ styles.buttonContainer }>
                    { addWallet }
                    { editPin }
                </View>
            );
        } else if (walletData.length !== 0) {
            content = (
                <>
                    <View style={ styles.buttonContainer }>
                        { addWallet }
                        { editPin }
                    </View>
                    <FlatList style={ styles.walletsList }
                              keyExtractor={ item => item.id }
                              data={ walletData }
                              renderItem={
                                  ({ item }) => (
                                      <WalletsList item={ item }
                                                   updateWalletData={ updateWalletData }
                                                   deleteWalletData={ deleteWalletData }
                                      />
                                  )
                              }
                    />
                </>
            );
        }
    }

    if (isReadyToAdd) {
        content = (
            <AddForm setWalletData={ setWalletData }
                     setIsReadyToAdd={ setIsReadyToAdd }
                     setWallet={ setWallet }
            />
        );
    }

    return (
            <KeyboardAvoidingView  style={ {width: '100%'} }
                                   behavior={ 'position' }
                                   keyboardVerticalOffset={ -50 }>
                <EditPinCodeModalWindow setVisibility={ setEditPinScreenIsVisible }
                                        visible={ editPinScreenIsVisible }
                                        setPinCode={ setPinCode }/>
                { pinPad }
                <AppScreen>
                    <Header onHomePress={ onHomePress }>
                        { title }
                    </Header>
                    <View style={ styles.container }>
                        { content }
                    </View>
                </AppScreen>
            </KeyboardAvoidingView>
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
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '45%'
    },
    walletsList: {
        width: '100%',
        marginBottom: 60
    }
});