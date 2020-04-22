import React, { useState } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';

import { RegularText } from "../Components/UI/RegularText";
import { InputForm } from "../Components/UI/InputForm";
import { THEME } from "../THEME";
import { AppButton } from "../Components/UI/AppButton";

export const InitialScreen = ({ setAccountData, setInitialModal, setUserAccount }) => {
    const [userTaxNumber, setUserTaxNumber] = useState('');
    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const setAccount = () => {
        if ((userTaxNumber && contact && phone && email) !== '') {
            const userData = {
                id: Date.now().toString(),
                userTaxNumber: userTaxNumber,
                concat: contact,
                phone: phone,
                email: email
            };
            setUserAccount([userData]);
            setAccountData([userData]);
            setInitialModal(true);
        } else {
            Alert.alert('Все поля обязательны для заполнения!');
        }
    };


    return (
        <KeyboardAvoidingView style={ styles.container }
                              behavior={ "position" }
                              keyboardVerticalOffset={ -140 }
        >
            <View style={ styles.inner }>
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { `Добро пожалоать в Bit2Pay` }
                    </RegularText>
                </View>
                <View style={ styles.inputs }>
                    <InputForm placeholder={ 'Введите ИНН' }
                               value={ userTaxNumber }
                               onChangeText={ setUserTaxNumber }
                    />
                    <InputForm placeholder={ 'Укажите контактное лицо' }
                               value={ contact }
                               onChangeText={ setContact }
                    />
                    <InputForm placeholder={ 'Введите номер телефона' }
                               value={ phone }
                               onChangeText={ setPhone }
                    />
                    <InputForm placeholder={ 'Введите email' }
                               value={ email }
                               onChangeText={ setEmail }
                    />
                </View>
                <AppButton buttonStyle={ styles.button }
                           onPress={ setAccount }
                >
                    { 'Далее' }
                </AppButton>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },
    inner: {
        padding: 20,
        justifyContent: "space-around",
        alignItems: 'center'
    },
    header: {
        fontSize: 36,
        color: THEME.WHITE_COLOR,
        marginTop: 60,
        marginBottom: 50

    },
    inputs: {
        marginBottom: 30
    },
    button: {
        width: '40%',
        backgroundColor: THEME.MAIN_COLOR
    }
});
