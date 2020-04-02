import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

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
    const [walletData, setWalletData] = useState([
        // {
        //     walletCurrency: 'Prizm',
        //     walletID: 'PRIZM-6XVX-S5KU-H35H-A38YM',
        //     walletPublicKey: '8f0826912bb84d4cbb39ab74284016b9d988fe6b7dd44c529a55b8a42d2531cc',
        //     id: Date.now()
        // }
    ]);

    const setWallet = async () => {
        try {
            console.log(JSON.stringify(walletData));
            await AsyncStorage.setItem('walletsList', JSON.stringify(walletData));
        } catch (e) {
            console.log(e);
        }
    };

    if (walletData.length !== 0) {
        setWallet();
    }

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('walletsList');
                console.log(value);
                const parsedData = JSON.parse(value);
                console.log(parsedData);
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
    };

    return (
        <MainLayout walletData={ walletData }
                    setWalletData={ setWalletData }
                    updateWalletData={ updateWalletData }
                    pinCode={ pinCode }
                    setPinCode={ setPinCode }
        />
    );
};