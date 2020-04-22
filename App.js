import React, { useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from "expo";

import { MainLayout } from "./src/MainLayout";


async function loadApplication() {
    await Font.loadAsync({
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf')
    });
}

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [accountData, setAccountData] = useState([]);
    const [walletData, setWalletData] = useState([]);
    const [pinCode, setNewPinCode] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [initialModal, setInitialModal] = useState(false);

    const setUserAccount = async (userAccountData) => {
        try {
            await AsyncStorage.setItem('userAccountData', JSON.stringify(userAccountData));
        } catch (e) {
            console.log(e);
        }
    };

    const setWallet = async (walletData) => {
        try {
            await AsyncStorage.setItem('walletsList', JSON.stringify(walletData));
        } catch (e) {
            console.log(e);
        }
    };

    const setPinCode = async (pin) => {
        setNewPinCode(pin);
        try {
            await AsyncStorage.setItem('pinCode', pin);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('userAccountData');
                const parsedData = JSON.parse(value);
                if (parsedData && parsedData.length !== 0) {
                    setAccountData(parsedData);
                }
            } catch(e) {
                console.log(`there's no account data`);
            }
            try {
                const value = await AsyncStorage.getItem('walletsList');
                const parsedData = JSON.parse(value);
                if (parsedData && parsedData.length !== 0) {
                    setWalletData(parsedData);
                }
            } catch(e) {
                console.log(`there's no wallet data`);
            }
            try {
                const value = await AsyncStorage.getItem('pinCode');
                if (value !== null) {
                    setNewPinCode(value);
                }
            } catch(e) {
                console.log(`there's no PIN code`);
            }
        })();
    }, []);

    if (!isReady) {
        return (
            <AppLoading startAsync={ loadApplication }
                        onError={ (error) => console.log(error) }
                        onFinish={() => setIsReady(true)}
            />
        );
    }

    const updateAccountData = (id, userTaxNumber, concat, phone, email) => {
        setAccountData((old) => old.map((accountData) => {
                if (accountData.id === id) {
                    accountData.userTaxNumber = userTaxNumber;
                    accountData.concat = concat;
                    accountData.phone = phone;
                    accountData.email = email;
                }
                return accountData;
            })
        );
        setUserAccount(accountData);
    };

    const updateWalletData = (id, address, prizmID = null) => {
        setWalletData((old) => old.map((wallet) => {
                if (wallet.id === id) {
                    wallet.walletAddress = address;
                    if (prizmID) {
                        wallet.prizmID = prizmID;
                    }
                }
                return wallet;
            })
        );
        setWallet(walletData);
    };

    const deleteWalletData = (id) => {
        const selectedWallet = walletData.find((wallet) => wallet.id === id);
        Alert.alert(
            `Выбранный кошелёк будет удалён`,
            `Вы уверены, что хотите удалить кошелёк "${ selectedWallet.walletCurrency }?"`,
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да', onPress: () => {
                        setWalletData((prevState) => {
                            setWallet(prevState.filter((wallet) => wallet.id !== id));
                            return prevState.filter((wallet) => wallet.id !== id);
                        });
                    }
                },
            ],
            { cancelable: false },
        );
    };

    const addTransaction = (id, transaction) => {
        setWalletData((old) => old.map((wallet) => {
                if (wallet.id === id) {
                    if (wallet.transactions === null || wallet.transactions === undefined) {
                        wallet.transactions = [transaction];
                    } else if (wallet.transactions){
                        wallet.transactions = [transaction, ...wallet.transactions];
                    }
                }
                return wallet;
            })
        );
        setWallet(walletData);
    };

    const deleteTransactions = (walletID) => {
        const selectedWallet = walletData.find((wallet) => wallet.id === walletID);
        Alert.alert(
            `История транзакций выбранного кошелька будет удалена`,
            `Вы уверены, что хотите удалить историю кошелька "${ selectedWallet.walletCurrency }?"`,
            [
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                {
                    text: 'Да', onPress: () => {
                        setWalletData((prevState) => {
                            const filtered =  prevState.filter((wallet) => wallet.id !== walletID);
                            let updatedWallet;
                            if (selectedWallet.walletCurrency === 'Prizm') {
                                updatedWallet = {
                                    id: selectedWallet.id,
                                    prizmID: selectedWallet.prizmID,
                                    walletAddress: selectedWallet.walletAddress,
                                    walletCurrency: selectedWallet.walletCurrency
                                }
                            } else {
                                updatedWallet = {
                                    id: selectedWallet.id,
                                    walletAddress: selectedWallet.walletAddress,
                                    walletCurrency: selectedWallet.walletCurrency
                                }
                            }
                            filtered.push(updatedWallet);
                            setWallet(filtered);
                            setVisibility(false);
                            return filtered;
                        });
                    }
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <MainLayout walletData={ walletData }
                    setWalletData={ setWalletData }
                    updateWalletData={ updateWalletData }
                    pinCode={ pinCode }
                    setPinCode={ setPinCode }
                    deleteWalletData={ deleteWalletData }
                    setWallet={ setWallet }
                    addTransaction={ addTransaction }
                    deleteTransactions={ deleteTransactions }
                    visibility={ visibility }
                    setVisibility={ setVisibility }
                    accountData={ accountData }
                    setAccountData={ setAccountData }
                    setUserAccount={ setUserAccount }
                    updateAccountData={ updateAccountData }
                    initialModal={ initialModal }
                    setInitialModal={ setInitialModal }
        />
    );
};