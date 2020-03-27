import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Modal, Dimensions, Animated, Easing} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { THEME } from "../../THEME";
import { AppButton } from "../UI/AppButton";
import { RegularText } from "../UI/RegularText";
import  Prizm  from "../../Services/Prizm";

export const QRModalWindow = ({ setVisibility, visible, qrData, clear, amount }) => {
    const prizm = new Prizm();
    const [price, setPrice] = useState(null);

    useEffect(() => {
        prizm.get_currency_prices()
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
    );

    if (price) {
        let cryptoAmount, percentage, sum;

        if (qrData.walletCurrency === 'Prizm') {
            cryptoAmount = parseFloat(amount / price).toFixed(3);
            percentage = parseFloat((cryptoAmount * 10) / 100).toFixed(3);
            sum = (parseFloat(cryptoAmount) + parseFloat(percentage)).toFixed(3);
        } else if (qrData.walletCurrency === 'Ethereum' || qrData.walletCurrency === 'Bitcoin') {
            cryptoAmount = parseFloat(amount / price).toFixed(10);
            percentage = parseFloat((cryptoAmount * 10) / 100).toFixed(10);
            sum = (parseFloat(cryptoAmount) + parseFloat(percentage)).toFixed(10);
        }

        const codeGenerator = (qrData) => {
            if (qrData.walletCurrency === 'Prizm') {
                return `${ qrData.walletID }:${ qrData.walletPublicKey }:${ sum }`;
            }
            if (qrData.walletCurrency === 'Ethereum') {
                return `${ qrData.walletCurrency.toLowerCase() }:${ qrData.walletPublicKey }?value=${ sum }`;
            }
            if (qrData.walletCurrency === 'Bitcoin') {
                return `${ qrData.walletCurrency.toLowerCase() }:${ qrData.walletPublicKey }?amount=${ sum }`;
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