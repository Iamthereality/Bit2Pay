import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';

import { AppButton } from "../UI/AppButton";
import { THEME } from "../../THEME";
import { RegularText } from "../UI/RegularText";
import {InputForm} from "../UI/InputForm";

export const EditWalletDataModalWindow = ({ setVisibility, wallet, visible, updateWalletData }) => {
    const [id, setID] = useState(wallet.walletID);
    const [publicKey, setPublicKey] = useState(wallet.walletPublicKey);

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ styles.container }>
                <RegularText style={ {fontSize: 26} }>
                    { wallet.walletCurrency }
                </RegularText>
                <View style={ styles.inputContainer }>
                    <InputForm value={ id } onChangeText={ setID } placeholder={ id }/>
                    <InputForm value={ publicKey } onChangeText={ setPublicKey } placeholder={ publicKey }/>
                </View>
                <View style={ styles.buttonContainer }>
                    <AppButton  buttonStyle={ styles.button }
                                onPress={ () => setVisibility(false) }>
                        { `Отмена` }
                    </AppButton>
                    <AppButton  buttonStyle={ styles.button }
                                onPress={ () => {
                                    updateWalletData(wallet.id, id, publicKey);
                                    setVisibility(false);
                                } }>
                        { `Сохранить` }
                    </AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
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