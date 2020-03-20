import React, { useState } from 'react';

import * as Font from 'expo-font';
import { AppLoading } from "expo";

import { MainLayout } from "./src/MainLayout";

async function load_application() {
    await Font.loadAsync({
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf')
    });
}

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <AppLoading startAsync={ load_application }
                        onError={ (error) => console.log(error) }
                        onFinish={() => setIsReady(true)}
            />
        );
    }

    return (
        <MainLayout/>
    );
};