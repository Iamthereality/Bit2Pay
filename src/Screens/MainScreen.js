import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

import { AppScreen } from "../Components/UI/AppScreen";
import { ThinText } from "../Components/UI/ThinText";
import CryptAPI from "../Services/CryptAPI";
import {RegularText} from "../Components/UI/RegularText";

export const MainScreen = ({ title }) => {
    const [error, setError] = useState(false);
    const [pzmPrice, setPzmPrice] = useState(null);
    const [ethPrice, setEthPrice] = useState(null);
    const [btcPrice, setBtcPrice] = useState(null);
    let content;

    const cryptAPI = new CryptAPI();
    const spinValue = new Animated.Value(0);
    const loadingSpinValue = new Animated.Value(0);

    useEffect(() => {
        cryptAPI.get_prices()
            .then(
                (resp) => resp.forEach((pair) => {
                    if (pair.marketName === 'PZM/RUB') {
                        setPzmPrice(pair.price);
                    }
                    if (pair.marketName === 'ETH/RUB') {
                        setEthPrice(pair.price);
                    }
                    if (pair.marketName === 'BTC/RUB') {
                        setBtcPrice(pair.price);
                    }
                })
            )
            .catch(() => setError(true));
    }, []);

    if (!pzmPrice && !ethPrice && !btcPrice) {
        Animated.loop(Animated.timing(
            loadingSpinValue,
            {
                toValue: 1,
                duration: 900,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )).start();

        const loadingSpin = loadingSpinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        content = (
            <>
                <View style={ styles.loading }>
                    <View style={ styles.loadingWrapper }>
                        <Animated.Image style={ { ...styles.loadingImage, transform: [{rotate: loadingSpin}] } }
                                        source={ require('../../assets/loading.png') }
                        />
                    </View>
                </View>
                <ThinText>
                    { 'Загрука текущих курсов валют' }
                </ThinText>
            </>
        );
    } else if (pzmPrice && ethPrice && btcPrice) {
        content = (
            <View style={ styles.loading }>
                <RegularText>
                    { `1 Prizm = ${ pzmPrice } ₽` }
                </RegularText>
                <RegularText>
                    { `1 Ethereum = ${ ethPrice } ₽` }
                </RegularText>
                <RegularText>
                    { `1 Bitcoin = ${ btcPrice } ₽` }
                </RegularText>
            </View>
        );
    }

    if (error) {
        content = (
            <View style={ styles.loading }>
                <ThinText>
                    { 'Упс. Что-то пошло не так...' }
                </ThinText>
            </View>
        );
    }

    Animated.loop(Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 9000,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <AppScreen style={ { paddingBottom: 30 } } >
            <ThinText style={ { fontSize: 22 } }>
                { title }
            </ThinText>
            <View style={ styles.logo }>
                <View style={ { ...styles.logoWrapper, justifyContent: 'center'} }>
                    <Animated.Image style={ { ...styles.logoImage, transform: [{rotate: spin}] } }
                                    source={ require('../../assets/prizm.png') }
                    />
                </View>
                <View style={ styles.logoWrapper }>
                    <Animated.Image style={ { ...styles.logoImage, transform: [{rotate: spin}] } }
                                    source={ require('../../assets/Bitcoin.png') }
                    />
                    <Animated.Image style={ { ...styles.logoImage, transform: [{rotate: spin}] } }
                                    source={ require('../../assets/Ethereum.png') }
                    />
                </View>
            </View>
            { content }
        </AppScreen>
    );
};

const styles = StyleSheet.create({
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
    },
    logoImage: {
        resizeMode: 'contain',
        width: 80,
        height: 80
    },
    logo: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    loadingWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        width: '100%'
    },
    loadingImage: {
        resizeMode: 'contain',
        width: 64,
        height: 64
    },
    loading: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
});