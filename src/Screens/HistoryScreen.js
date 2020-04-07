import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { Header } from '../Components/UI/Header';
import { ThinText } from "../Components/UI/ThinText";
import { AppButton } from "../Components/UI/AppButton";
import { SelectWallet } from "../Components/UI/SelectWallet";
import {THEME} from "../THEME";
import {TransactionsHistory} from "../Components/ModalWindows/TransactionsHistory";

export const HistoryScreen = ({ onHomePress, style, title, walletData }) => {
    const [wallet, setWallet] = useState(null);
    const [visible, setVisibility] = useState(false);

    const onWalletPress = (item) => {
        setWallet(item);
        setVisibility(true);
    };

    const modalWindow = wallet ? <TransactionsHistory wallet={ wallet } setVisibility={ setVisibility } visible={ visible }/> : null;

    let content = (
        <>
            <ThinText style={ { paddingBottom: 20 } }>
                { 'Выберите кошелёк' }
            </ThinText>
            { modalWindow }
            <FlatList data={ walletData }
                      keyExtractor={ (item) => item.id  }
                      renderItem={ ({ item }) => <SelectWallet item={ item } onPress={ onWalletPress } /> } />
        </>
    );

    return (
        <AppScreen style={ style } >
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
            { content }
        </AppScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});