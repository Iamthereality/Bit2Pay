import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Modal, Dimensions, Animated, Easing} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { THEME } from "../../THEME";
import { AppButton } from "../UI/AppButton";
import { RegularText } from "../UI/RegularText";
import CryptAPI from "../../Services/CryptAPI";


export const QRModalWindow = ({ setVisibility, visible, qrData, clear, amount, addTransaction }) => {
    const cryptAPI = new CryptAPI();
    const [price, setPrice] = useState(null);

    useEffect(() => {
        cryptAPI.get_currency_prices()
            .then((resp) => currencyAmount(resp, qrData))
            .catch((e) => console.log(e));
    }, []);

    const currencyAmount = (response, wallet) => {
        const priceSetter = (pair) => {
            response.forEach((currency) => {
                currency.forEach((prop) => {
                    if (prop[1] === pair) {
                        currency.forEach((prop) => {
                            if (prop[0] === 'price') {
                                setPrice(prop[1]);
                            }
                        });
                    }
                });
            });
        };

        if (wallet.walletCurrency === 'Prizm') {
            priceSetter('PZM/RUB');
        }
        if (wallet.walletCurrency === 'Ethereum') {
            priceSetter('ETH/RUB');
        }
        if (wallet.walletCurrency === 'Bitcoin') {
            priceSetter('BTC/RUB');
        }
    };

    const spinValue = new Animated.Value(0);

    Animated.loop(Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 900,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    let content = (
        <View style={ styles.greetings }>
            <View style={ styles.image_wrap }>
                <Animated.Image style={ { ...styles.image, transform: [{rotate: spin}] } }
                                source={ require('../../../assets/loading.png') }
                />
            </View>
        </View>
    ), cryptoAmount;

    if (price) {
        let percentage, sum;

        const getSum = (roundTo) => {
            cryptoAmount = parseFloat(amount / price).toFixed(roundTo);
            percentage = parseFloat((cryptoAmount * 10) / 100).toFixed(roundTo);
            sum = (parseFloat(cryptoAmount) + parseFloat(percentage)).toFixed(roundTo);
        };

        const codeGenerator = (qrData) => {
            if (qrData.walletCurrency === 'Prizm') {
                getSum(3);
                return `${ qrData.prizmID }:${ qrData.walletAddress }:${ sum }`;
            }
            if (qrData.walletCurrency === 'Ethereum') {
                getSum(10);
                return `${ qrData.walletCurrency.toLowerCase() }:${ qrData.walletAddress }?value=${ sum }`;
            }
            if (qrData.walletCurrency === 'Bitcoin') {
                getSum(10);
                return `${ qrData.walletCurrency.toLowerCase() }:${ qrData.walletAddress }?amount=${ sum }`;
            }
        };

        content = (
            <>
                <QRCode value={ codeGenerator(qrData) }
                        size={ Dimensions.get('window').width - 40 }
                        color={ THEME.WHITE_COLOR }
                        backgroundColor={ THEME.BLACK_COLOR }/>
                <RegularText>
                    { `Сумма: ${ sum } ${qrData.walletCurrency}` }
                </RegularText>
                <RegularText>
                    { `Текущий курс: 1 ${qrData.walletCurrency} = ${ price } ₽` }
                </RegularText>
            </>
        );
    }

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visible }>
            <View style={ styles.container }>
                { content }
                <AppButton onPress={ () => {
                    addTransaction(qrData.id, {
                        id: Date.now(),
                        cryptoAmount: cryptoAmount,
                        amountRUB: amount
                    });
                    setVisibility(false);
                    clear();
                } }>
                    { 'Готово' }
                </AppButton>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        padding: 20,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME.BLACK_COLOR
    },
    image_wrap: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: '100%'
    },
    image: {
        resizeMode: 'contain',
        width: 64,
        height: 64
    },
    greetings: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
});