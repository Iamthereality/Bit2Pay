import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { Header } from '../Components/UI/Header';
import { AppButton } from "../Components/UI/AppButton";
import {AddForm} from "../Components/AddForm";

export const WalletScreen = ({ onHomePress, style, title }) => {
    const [address, setAddress] = useState(null);

    return (
        <AppScreen style={ style } >
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            <View style={ styles.container }>
                <AddForm placeholder={ 'Введите адрес кошелька' } address={ address } setAddress={ setAddress }/>
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
        justifyContent: 'space-between'
    },
    button: {
        width: '40%'
    }
});