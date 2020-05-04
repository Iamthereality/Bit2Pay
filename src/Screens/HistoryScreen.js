import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { Header } from '../Components/UI/Header';
import { ThinText } from "../Components/UI/ThinText";
import { SelectWallet } from "../Components/UI/SelectWallet";
import { TransactionsHistory } from "../Components/ModalWindows/TransactionsHistory";

export const HistoryScreen = ({ onHomePress, style, title, walletData, deleteTransactions, visibility, setVisibility }) => {
    const [wallet, setWallet] = useState(null);

    const onWalletPress = (item) => {
        setWallet(item);
        setVisibility(true);
    };

    const modalWindow = wallet ?
        <TransactionsHistory
            wallet={ wallet }
            setVisibility={ setVisibility }
            visibility={ visibility }
            deleteTransactions={ deleteTransactions }
        /> : null;

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