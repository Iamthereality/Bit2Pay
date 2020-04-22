import React, {useState} from 'react';
import { StyleSheet, View } from "react-native";

import { Navbar } from "./Components/Navbar";
import { MainScreen } from "./Screens/MainScreen";
import { QRCodeAddScreen } from "./Screens/QRCodeAddScreen";
import { WalletScreen } from "./Screens/WalletScreen";
import { HistoryScreen } from "./Screens/HistoryScreen";
import { THEME } from "./THEME";
import {InitialScreen} from "./Screens/InitialScreen";
import {InitialModalWindow} from "./Components/ModalWindows/InitialiModalWindow";

export const MainLayout = ({
        walletData,
        setWalletData,
        updateWalletData,
        pinCode,
        setPinCode,
        deleteWalletData,
        setWallet,
        deleteTransactions,
        addTransaction,
        visibility,
        setVisibility,
        accountData,
        setAccountData,
        setUserAccount,
        updateAccountData,
        initialModal,
        setInitialModal
    }) => {
    const [screen, setScreen] = useState(null);

    let content = (
        <MainScreen title={ 'Bit2Pay' }/>
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
            <QRCodeAddScreen title={ 'Новый платёж' }
                             walletData={ walletData }
                             onHomePress={ screenSelect }
                             addTransaction={ addTransaction }
            />
        );
    }

    if (screen === 'WALLET') {
        content = (
            <WalletScreen title={ 'Мой кошелёк' }
                          setWalletData={ setWalletData }
                          walletData={ walletData }
                          onHomePress={ screenSelect }
                          updateWalletData={ updateWalletData }
                          pinCode={ pinCode }
                          setPinCode={ setPinCode }
                          deleteWalletData={ deleteWalletData }
                          setWallet={ setWallet }
                          accountData={ accountData }
                          updateAccountData={ updateAccountData }
            />
        );
    }

    if (screen === 'HISTORY') {
        content = (
            <HistoryScreen title={ 'История транзакций' }
                           onHomePress={ screenSelect }
                           walletData={ walletData }
                           deleteTransactions={ deleteTransactions }
                           visibility={ visibility }
                           setVisibility={ setVisibility }
            />
        );
    }

    const activeScreen = accountData.length === 0 ?
        <InitialScreen setAccountData={ setAccountData }
                       initialModal={ initialModal }
                       setInitialModal={ setInitialModal }
                       setUserAccount={ setUserAccount }
        />
    : (
        <>
            <InitialModalWindow visible={ initialModal }
                                setVisibility={ setInitialModal }
                                screenSelect={ screenSelect }
            />
            { content }
            <Navbar screenSelect={ screenSelect }/>
        </>
    );

    return (
        <View style={ styles.container }>
            { activeScreen }

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