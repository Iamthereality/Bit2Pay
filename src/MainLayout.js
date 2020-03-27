import React, {useState} from 'react';
import { StyleSheet, View } from "react-native";

import { Navbar } from "./Components/Navbar";
import { MainScreen } from "./Screens/MainScreen";
import { QRCodeAddScreen } from "./Screens/QRCodeAddScreen";
import { WalletScreen } from "./Screens/WalletScreen";
import { HistoryScreen } from "./Screens/HistoryScreen";
import { THEME } from "./THEME";

export const MainLayout = ({ walletData, setWalletData, updateWalletData }) => {
    const [screen, setScreen] = useState(null);


    let content = (
        <MainScreen title={ 'Платёжный клиент Prizm' } />
    );

    const screenSelect = (button) => {
        if (button === 'QR') {
            setScreen('QR');
        } else if (button === 'HISTORY') {
            setScreen('HISTORY');
        } else if (button === 'WALLET') {
            setScreen('WALLET');
        } else {
            setScreen(null);
        }
    };

    if (screen === 'QR') {
        content = (
            <QRCodeAddScreen title={ 'Новый платёж' } walletData={ walletData } onHomePress={ screenSelect }/>
        );
    }

    if (screen === 'WALLET') {
        content = (
            <WalletScreen title={ 'Мой кошелёк' }
                          setWalletData={ setWalletData }
                          walletData={ walletData }
                          onHomePress={ screenSelect }
                          updateWalletData={ updateWalletData }/>
        );
    }

    if (screen === 'HISTORY') {
        content = (
            <HistoryScreen title={ 'История транзакций' } onHomePress={ screenSelect }/>
        );
    }

    return (
        <View style={ styles.container }>
            { content }
            <Navbar screenSelect={ screenSelect }/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: THEME.BLACK_COLOR,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    }
});