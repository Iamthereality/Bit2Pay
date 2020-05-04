import React, { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView } from 'react-native';

import { AntDesign } from "@expo/vector-icons";

import { AppScreen } from "../UI/AppScreen";
import { THEME } from "../../THEME";
import { RegularText } from "../UI/RegularText";
import { AppButton } from "../UI/AppButton";
import { ThinText } from "../UI/ThinText";
import { InputForm } from "../UI/InputForm";


export const EditAccountDataModalWindow = ({ visible, setVisibility, accountData, updateAccountData }) => {
    const [userTaxNumber, setUserTaxNumber] = useState(accountData.userTaxNumber);
    const [contact, setContact] = useState(accountData.concat);
    const [phone, setPhone] = useState(accountData.phone);
    const [email, setEmail] = useState(accountData.email);

    const clear = () => {
      setUserTaxNumber('');
      setContact('');
      setPhone('');
      setEmail('');
    };

    const save = () => {
        updateAccountData(accountData.id, userTaxNumber, contact, phone, email);
        setVisibility(false);
    };

    return (
        <Modal animationType={ 'slide' }
               // transparent={ false }
               visible={ visible }>
            <AppScreen style={ styles.container }>
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { `Редактировать` }
                    </RegularText>
                    <AppButton buttonStyle={ styles.closeButton }
                               onPress={ () => setVisibility(false) }>
                        <AntDesign name={ 'close' } size={ 20 }/>
                    </AppButton>
                </View>
                <ScrollView style={ { width: '100%' } }>
                    <ThinText>
                        { 'ИНН' }
                    </ThinText>
                    <InputForm value={ userTaxNumber } onChangeText={ setUserTaxNumber } placeholder={ userTaxNumber }/>
                    <ThinText>
                        { 'Контактное лицо' }
                    </ThinText>
                    <InputForm value={ contact } onChangeText={ setContact } placeholder={ contact }/>
                    <ThinText>
                        { 'Номер телефона' }
                    </ThinText>
                    <InputForm value={ phone } onChangeText={ setPhone } placeholder={ phone }/>
                    <ThinText>
                        { 'Email' }
                    </ThinText>
                    <InputForm value={ email } onChangeText={ setEmail } placeholder={ email }/>
                    <View style={ styles.buttonContainer }>
                        <AppButton  buttonStyle={ styles.button }
                                    onPress={ clear }>
                            { `Очистить` }
                        </AppButton>
                        <AppButton  buttonStyle={ styles.button }
                                    onPress={ save }>
                            { `Сохранить` }
                        </AppButton>
                    </View>
                </ScrollView>
            </AppScreen>
        </Modal>
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
        backgroundColor: THEME.BLACK_COLOR,
        height: '100%'
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
        paddingHorizontal: 5
    },
    button: {
        width: '45%'
    }
});