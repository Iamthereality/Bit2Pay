import React, { useState } from 'react';
import {View, StyleSheet, Alert, ScrollView } from 'react-native';

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
        <ScrollView contentContainerStyle={ styles.container }>
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
            <View style={ styles.buttonContainer }>
                <AppButton
                    buttonStyle={ styles.button }
                    onPress={ setAccount }
                >
                    { 'Далее' }
                </AppButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        padding: 20
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
        width: '40%'
    }
});
