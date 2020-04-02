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
    const [pinCode, setNewPinCode] = useState(null);
    const [walletData, setWalletData] = useState([]);

    const setWallet = async (walletData) => {
        try {
            await AsyncStorage.setItem('walletsList', JSON.stringify(walletData));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('walletsList');
                const parsedData = JSON.parse(value);
                if (parsedData.length !== 0) {
                    setWalletData(parsedData);
                }
            } catch(e) {
                console.log(e);
            }
        })();
    }, []);

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
                const value = await AsyncStorage.getItem('pinCode');
                if (value !== null) {
                    setNewPinCode(value);
                }
            } catch(e) {
                console.log(e);
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

    const updateWalletData = (id, walletID, publicKey) => {
        setWalletData((old) => old.map((wallet) => {
                if (wallet.id === id) {
                    wallet.walletID = walletID;
                    wallet.walletPublicKey = publicKey;
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

    return (
        <MainLayout walletData={ walletData }
                    setWalletData={ setWalletData }
                    updateWalletData={ updateWalletData }
                    pinCode={ pinCode }
                    setPinCode={ setPinCode }
                    deleteWalletData={ deleteWalletData }
                    setWallet={ setWallet }
        />
    );
};