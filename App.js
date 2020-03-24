import React, { useState } from 'react';

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
    const [walletData, setWalletData] = useState([
        {
            walletCurrency: 'Prizm',
            walletID: '123235',
            walletPublicKey: 'publicKey1',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Ethereum',
            walletID: '2534232',
            walletPublicKey: 'publicKey2',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Bitcoin',
            walletID: '33423123',
            walletPublicKey: 'publicKey3',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Prizm',
            walletID: '412312',
            walletPublicKey: 'publicKey4',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Ethereum',
            walletID: '512312323',
            walletPublicKey: 'publicKey5',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Bitcoin',
            walletID: '612312312',
            walletPublicKey: 'publicKey6',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Prizm',
            walletID: '7123123',
            walletPublicKey: 'publicKey7',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Ethereum',
            walletID: '83412323',
            walletPublicKey: 'publicKey8',
            walletPrivateKey: 'privateKey'
        },
        {
            walletCurrency: 'Bitcoin',
            walletID: '91231231',
            walletPublicKey: 'publicKey9',
            walletPrivateKey: 'privateKey'
        }
        ]);

    if (!isReady) {
        return (
            <AppLoading startAsync={ loadApplication }
                        onError={ (error) => console.log(error) }
                        onFinish={() => setIsReady(true)}
            />
        );
    }

    return (
        <MainLayout walletData={ walletData } setWalletData={ setWalletData }/>
    );
};