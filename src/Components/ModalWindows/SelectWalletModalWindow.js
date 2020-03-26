import React from 'react';
import {FlatList, Modal, StyleSheet, View} from 'react-native';

import { THEME } from "../../THEME";
import {AppButton} from "../UI/AppButton";
import {RegularText} from "../UI/RegularText";
import {ThinText} from "../UI/ThinText";

export const SelectWalletModalWindow = ({ walletData, setVisibility, visible, setWallet, setWalletSelected }) => {

    const onPress = (item) => {
        setWallet(item);
        setVisibility(false);
        setWalletSelected(true);
    };

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ styles.container }>
                <RegularText style={ styles.header }>
                    { 'Выберите кошелёк' }
                </RegularText>
                <FlatList style={ styles.walletsList }
                          keyExtractor={ item => item.walletPublicKey }
                          data={ walletData }
                          renderItem={
                              ({ item }) => (
                                  <View style={ styles.itemContainer }>
                                      <RegularText style={ styles.itemLabel }>
                                          { item.walletCurrency }
                                      </RegularText>
                                      <AppButton buttonStyle={ styles.button } onPress={ () => onPress(item) }>
                                          { item.walletID }
                                      </AppButton>
                                  </View>
                              )
                          }/>
                <AppButton onPress={ () => setVisibility(false) }>
                  { 'Назад' }
                </AppButton>
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
        marginTop: 10,
        marginBottom: 20
    },
    walletsList: {
        width: '100%',
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    itemLabel: {
        padding: 10
    },
    button: {
        width: '100%'
    }
});