import React, { useState } from 'react';
import { Modal, View, StyleSheet, Alert } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { AppButton } from "../UI/AppButton";
import { THEME } from "../../THEME";
import { RegularText } from "../UI/RegularText";
import { InputForm } from "../UI/InputForm";
import { ThinText } from "../UI/ThinText";

export const EditWalletDataModalWindow = ({ setVisibility, wallet, visible, updateWalletData }) => {
    const [id, setID] = useState(wallet.walletID);
    const [publicKey, setPublicKey] = useState(wallet.walletPublicKey);

    const save = () => {
        if (id !== '' || publicKey !== '') {
            updateWalletData(wallet.id, id, publicKey);
            setVisibility(false);
        } else if (id === '' || publicKey === '') {
            Alert.alert('Поля не могут быть пустыми!');
        }
    };

    const clear = () => {
        setID('');
        setPublicKey('');
    };

    const close = () => {
        setID(wallet.walletID);
        setPublicKey(wallet.walletPublicKey);
        setVisibility(false);
    };

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { wallet.walletCurrency }
                    </RegularText>
                    <AppButton buttonStyle={ styles.closeButton }
                               onPress={ close }>
                        <AntDesign name={ 'close' } size={ 20 }/>
                    </AppButton>
                </View>
                <View style={ styles.inputContainer }>
                    <View>
                        <ThinText>
                            { `Индентификатор` }
                        </ThinText>
                        <InputForm value={ id } onChangeText={ setID } placeholder={ id }/>
                    </View>
                    <View>
                        <ThinText>
                            { `Публичный ключ` }
                        </ThinText>
                        <InputForm value={ publicKey } onChangeText={ setPublicKey } placeholder={ publicKey }/>
                    </View>
                </View>
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
        width: '40%'
    }
});