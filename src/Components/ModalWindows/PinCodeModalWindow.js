import React, { useState } from 'react';
import { Modal, View, StyleSheet, Alert } from 'react-native';

import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "../../THEME";
import { AppButton } from "../UI/AppButton";
import { ThinText } from "../UI/ThinText";
import { Header } from "../UI/Header";

export const PinCodeModalWindow = ({ visible, setVisibility, pinCode, onHomePress }) => {
    const [pin, setPin] = useState('');

    if (pinCode === pin) {
        setVisibility(false);
    } else if (pinCode.length === pin.length && pinCode !== pin) {
        Alert.alert('Введён не верный PIN!');
        setPin('');
    }

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ THEME.CONTAINER }>
                <Header onHomePress={ onHomePress }>
                    { 'Введите PIN' }
                </Header>
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
                        <AppButton buttonStyle={ { ...styles.button, borderColor: 'transparent' } }
                                   onPress={ () => setPin('') }>
                            <MaterialIcons name={ 'clear' } size={ 25 }/>
                        </AppButton>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setPin(`${ pin }${ 0 }`) }>
                            { '0' }
                        </AppButton>
                        <AppButton buttonStyle={ { ...styles.button, borderColor: 'transparent' } }
                                   onPress={ () => setPin(pin.substring(0, pin.length - 1)) }>
                            <MaterialIcons name={ 'keyboard-backspace' } size={ 25 }/>
                        </AppButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    }
});