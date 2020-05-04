import React, { useState } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

import { AppScreen } from '../Components/UI/AppScreen';
import { Header } from '../Components/UI/Header';
import { AppButton } from '../Components/UI/AppButton';
import { AddForm } from '../Components/AddForm';
import { WalletsList } from '../Components/WalletsList';
import { PinCodeModalWindow } from "../Components/ModalWindows/PinCodeModalWindow";
import { EditPinCodeModalWindow } from "../Components/ModalWindows/EditPinCodeModalWindow";
import {RegularText} from "../Components/UI/RegularText";
import {EditAccountDataModalWindow} from "../Components/ModalWindows/EditAccountDataModalWindow";

export const WalletScreen = ({
        onHomePress,
        setWalletData,
        walletData,
        title,
        updateWalletData,
        pinCode,
        setPinCode,
        deleteWalletData,
        setWallet,
        accountData,
        updateAccountData
    }) => {
    const [isReadyToAdd, setIsReadyToAdd] = useState(false);
    const [pinPadIsVisible, setPinPadIsVisible] = useState(true);
    const [editPinScreenIsVisible, setEditPinScreenIsVisible] = useState(false);
    const [settingsIsOpened, setSettingsIsOpened] = useState(false);
    const [editAccount, setEditAccount] = useState(false);

    const addWallet = (
        <AppButton buttonStyle={ styles.button }
                   textStyle={ { fontSize: 20 } }
                   onPress={ () => setIsReadyToAdd(true) }>
            <Feather name={ 'plus' } size={ 20 }/>
            { ' адрес' }
        </AppButton>
    );

    let content, pinPad, editPin, screen;

    const settings = (
        <AppButton buttonStyle={ { borderColor: 'transparent', width: 50 } }
                   onPress={ () => setSettingsIsOpened(true) }
        >
            <Feather name={ 'settings' } size={ 25 }/>
        </AppButton>
    );

    if (pinCode !== null) {
        editPin = (
            <AppButton buttonStyle={ styles.settingsButton }
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
            <AppButton buttonStyle={ styles.settingsButton }
                       onPress={ () => setEditPinScreenIsVisible(true) }>
                { 'Задать PIN' }
            </AppButton>
        );
        pinPad = null;
    }

    if (settingsIsOpened) {
        screen = (
            <AppScreen>
                <EditAccountDataModalWindow visible={ editAccount }
                                            setVisibility={ setEditAccount }
                                            accountData={ accountData[0] }
                                            updateAccountData={ updateAccountData }
                />
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { 'Настройки' }
                    </RegularText>
                    <AppButton buttonStyle={ styles.closeButton }
                               onPress={ () => setSettingsIsOpened(false) }>
                        <AntDesign name={ 'close' } size={ 20 }/>
                    </AppButton>
                </View>
                <View style={ styles.container }>
                    { editPin }
                    <AppButton buttonStyle={ styles.settingsButton }
                               onPress={ () => setEditAccount(true) }
                    >
                        { 'Данные аккаунта' }
                    </AppButton>
                </View>
            </AppScreen>
        );
    } else {
        if (!isReadyToAdd) {
            if (walletData.length === 0) {
                content = (
                    <View style={ styles.buttonContainer }>
                        { addWallet }
                        { settings }
                    </View>
                );
            } else if (walletData.length !== 0) {
                content = (
                    <>
                        <View style={ styles.buttonContainer }>
                            { addWallet }
                            { settings }
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

        screen = (
            <AppScreen>
                <Header onHomePress={ onHomePress }>
                    { title }
                </Header>
                <View style={ styles.container }>
                    { content }
                </View>
            </AppScreen>
        );
    }


    return (
            <KeyboardAvoidingView  style={ {width: '100%'} }
                                   behavior={ 'position' }
                                   keyboardVerticalOffset={ -100 }
            >
                <EditPinCodeModalWindow setVisibility={ setEditPinScreenIsVisible }
                                        visible={ editPinScreenIsVisible }
                                        setPinCode={ setPinCode }/>
                { pinPad }
                { screen }
            </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    closeButton: {
        width: 50,
        borderColor: 'transparent'
    },
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
    settingsButton: {
        width: '90%',
        marginVertical: 20
    },
    walletsList: {
        width: '100%',
        marginBottom: 60
    }
});