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
            walletID: 'PRIZM-6XVX-S5KU-H35H-A38YM',
            walletPublicKey: '8f0826912bb84d4cbb39ab74284016b9d988fe6b7dd44c529a55b8a42d2531cc'
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