import React from 'react';
import {FlatList, Modal, StyleSheet, View} from 'react-native';

import { THEME } from "../THEME";
import {AppButton} from "./UI/AppButton";

export const SelectWallet = ({ walletData, setVisibility, visible, setWallet }) => {
    return (
        <Modal visible={ visible }
               animationtype={ 'slide' }>
            <View style={ styles.container }>
                <FlatList style={ styles.walletsList }
                          keyExtractor={ item => item.walletPublicKey }
                          data={ walletData }
                          renderItem={
                              ({ item }) => (
                                  <View >
                                      <AppButton onPress={() => {
                                          setWallet(item);
                                          setVisibility(false);
                                      }}>
                                          { item.walletCurrency }
                                      </AppButton>
                                  </View>
                              )
                          }/>
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
        padding: 10,
        backgroundColor: THEME.BLACK_COLOR
    },
    walletsList: {
        width: '100%',
    }
});