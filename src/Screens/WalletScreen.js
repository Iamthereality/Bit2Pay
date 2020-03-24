import React, { useState } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView  } from 'react-native';

import { AppScreen } from '../Components/UI/AppScreen';
import { Header } from '../Components/UI/Header';
import { AppButton } from "../Components/UI/AppButton";
import { AddForm } from '../Components/AddForm';
import { WalletsList } from "../Components/WalletsList";

export const WalletScreen = ({ onHomePress, setWalletData, walletData, title }) => {
    const [isReadyToAdd, setIsReadyToAdd] = useState(false);
    let content;

    if (!isReadyToAdd) {
        if (walletData.length === 0) {
            content = (
                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button }
                               onPress={ () => setIsReadyToAdd(true) }>
                        { 'Добавить кошелёк' }
                    </AppButton>
                </View>
            );
        } else if (walletData.length !== 0) {
            content = (
                <>
                    <View style={ styles.buttonContainer }>
                        <AppButton buttonStyle={ styles.button }
                                   onPress={ () => setIsReadyToAdd(true) }>
                            { 'Добавить кошелёк' }
                        </AppButton>
                    </View>
                    <FlatList style={ styles.walletsList }
                              keyExtractor={ item => item.walletPublicKey }
                              data={ walletData }
                              renderItem={
                                  ({ item }) => (
                                      <WalletsList item={ item }/>
                                  )
                              }
                    />
                </>
            );
        }
    }

    if (isReadyToAdd) {
        content = (
                <AddForm setWalletData={ setWalletData } setIsReadyToAdd={ setIsReadyToAdd }/>
        );
    }

    return (

            <KeyboardAvoidingView  style={ {width: '100%'} }
                                   behavior={ 'position' }
                                   keyboardVerticalOffset={ -50 }>
                <AppScreen>
                <Header onHomePress={ onHomePress }>
                    { title }
                </Header>
                <View style={ styles.container }>
                    { content }
                </View>
                </AppScreen>
            </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '60%'
    },
    walletsList: {
        width: '100%',
        marginBottom: 60
    }
});