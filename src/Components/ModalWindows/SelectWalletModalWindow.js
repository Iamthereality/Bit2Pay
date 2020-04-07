import React from 'react';
import { FlatList, Modal, StyleSheet, View } from 'react-native';

import { AntDesign } from "@expo/vector-icons";

import { THEME } from "../../THEME";
import { AppButton } from "../UI/AppButton";
import { RegularText } from "../UI/RegularText";
import {SelectWallet} from "../UI/SelectWallet";


export const SelectWalletModalWindow = ({ walletData, setVisibility, visible, setWallet, setWalletSelected, onHomePress }) => {

    const onPress = (item) => {
        setWallet(item);
        setVisibility(false);
        setWalletSelected(true);
    };

    let content = (
        <>
            <View style={ styles.header }>
                <RegularText style={ { fontSize: 22 } }>
                    { 'Выберите кошелёк' }
                </RegularText>
                <AppButton buttonStyle={ styles.closeButton }
                           onPress={ () => setVisibility(false) }>
                    <AntDesign name={ 'close' } size={ 20 }/>
                </AppButton>
            </View>
            <FlatList style={ styles.walletsList }
                      keyExtractor={ item => item.id }
                      data={ walletData }
                      renderItem={ ({ item }) => <SelectWallet item={ item } onPress={ onPress } /> }
            />
        </>
    );

    if (walletData.length === 0) {
        content = (
            <>
                <View style={ styles.header }>
                    <RegularText style={ { fontSize: 22 } }>
                        { 'Нет доступных кошёльков' }
                    </RegularText>
                    <AppButton buttonStyle={ styles.closeButton }
                               onPress={ () => setVisibility(false) }>
                        <AntDesign name={ 'close' } size={ 20 }/>
                    </AppButton>
                </View>
                <AppButton buttonStyle={ styles.addWallet }
                           onPress={ () => {
                               setVisibility(false);
                               onHomePress('WALLET');
                           } }>
                    { 'Добавить кошелёк?' }
                </AppButton>
            </>
        );
    }

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ styles.container }>
                { content }

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME.BLACK_COLOR
    },
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
    walletsList: {
        width: '100%',
    },
    addWallet: {
        marginVertical: 30,
        width: '60%'
    }
});