import React, { useState } from 'react';
import { Modal, View, StyleSheet, Alert } from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { THEME } from "../../THEME";
import { AppButton } from "../UI/AppButton";
import { ThinText } from "../UI/ThinText";
import { RegularText } from "../UI/RegularText";

export const EditPinCodeModalWindow = ({ visible, setVisibility, setPinCode }) => {
    const [pin, setPin] = useState('');

    if (pin.length > 6) {
        Alert.alert('Длина PIN должна быть 6 символов');
        setPin(pin.substring(0, pin.length - 1));
    }

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ THEME.CONTAINER }>
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { 'Введите новый PIN' }
                    </RegularText>
                    <AppButton buttonStyle={ styles.closeButton }
                               onPress={ () => setVisibility(false) }>
                        <AntDesign name={ 'close' } size={ 20 }/>
                    </AppButton>
                </View>
                <View>
                    <ThinText style={ styles.text }>
                        { pin.replace(/./gm, '*') }
                    </ThinText>
                </View>
                <View style={ styles.pinPad }>
                    <View style={ styles.row }>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 1 }`) }>
                            { '1' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 2 }`) }>
                            { '2' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 3 }`) }>
                            { '3' }
                        </AppButton>
                    </View>
                    <View style={ styles.row }>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 4 }`) }>
                            { '4' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 5 }`) }>
                            { '5' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 6 }`) }>
                            { '6' }
                        </AppButton>
                    </View>
                    <View style={ styles.row }>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 7 }`) }>
                            { '7' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 8 }`) }>
                            { '8' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 9 }`) }>
                            { '9' }
                        </AppButton>
                    </View>
                    <View style={ styles.row }>
                        <AppButton buttonStyle={ { ...styles.button, borderColor: 'transparent' } }>
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 0 }`) }>
                            { '0' }
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(pin.substring(0, pin.length - 1)) }>
                            <MaterialIcons name={ 'keyboard-backspace' } size={ 25 }/>
                        </AppButton>
                    </View>
                </View>
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.actionButton }
                        onPress={ () => setPin('') }>
                        { 'Очистить' }
                    </AppButton>
                    <AppButton buttonStyle={ styles.actionButton }
                        onPress={ () => {
                            if (pin !== '') {
                                setPinCode(pin);
                                setVisibility(false);
                            } else {
                                Alert.alert('Длина PIN должна быть 6 символов');
                            }
                    } }>
                        { 'Сохранить' }
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
    text: {
        fontSize: 26,
        textAlign: 'center',
        width: 120,
        borderBottomWidth: 0.5,
        borderColor: THEME.MAIN_COLOR
    },
    pinPad: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        marginVertical: 10,
        flexDirection: 'row',
        width: 210,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        width: 50,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    actionButton: {
        width: '40%'
    }
});