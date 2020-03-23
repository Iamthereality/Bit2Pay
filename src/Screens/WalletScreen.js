import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';

import { AppScreen } from '../Components/UI/AppScreen';
import { Header } from '../Components/UI/Header';
import { AppButton } from "../Components/UI/AppButton";
import { AddForm } from '../Components/AddForm';

export const WalletScreen = ({ onHomePress, style, title }) => {
    const [isReadyToAdd, setIsReadyToAdd] = useState(false);
    const [userData, setUserData] = useState(null);

    const [isAdded, setIsAdded] = useState(false);


    let content;

    const addWalletData = () => {
        setIsReadyToAdd(true);
    };

    if (!isReadyToAdd) {
        content = (
            <View style={ styles.buttonContainer }>
                <AppButton buttonStyle={ styles.button }
                           onPress={ addWalletData }>
                    { 'Добавить кошелёк' }
                </AppButton>
            </View>
        );
    }

    if (isReadyToAdd) {
        content = (
            <AddForm userData={ userData }
                     setUserData={ setUserData }
            />
        );
    }

    return (
        <AppScreen style={ style } >
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            <View style={ styles.container }>
                { content }
            </View>
        </AppScreen>
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
    }
});