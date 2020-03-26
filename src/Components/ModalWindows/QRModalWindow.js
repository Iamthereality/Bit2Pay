import React, { useState } from 'react';
import {View, StyleSheet, Modal, Dimensions, Animated, Easing} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { THEME } from "../../THEME";
import { AppButton } from "../UI/AppButton";
import  Prizm  from "../../Services/Prizm";
import {RegularText} from "../UI/RegularText";

export const QRModalWindow = ({ setVisibility, visible, qrData, clear, amount }) => {
    const [price, setPrice] = useState(null);
    const prizm = new Prizm();

    const currencyAmount = (response, wallet) => {
        if (wallet.walletCurrency === 'Prizm') {
           response.forEach((currency) => {
               currency.forEach((prop) => {
                   if (prop[1] === 'PZM/RUB') {
                       currency.forEach((prop) => {
                           if (prop[0] === 'price') {
                               setPrice(prop[1]);
                           }
                       });
                   }
               });
           });
        }
        if (wallet.walletCurrency === 'Ethereum') {
            response.forEach((currency) => {
                currency.forEach((prop) => {
                    if (prop[1] === 'ETH/RUB') {
                        currency.forEach((prop) => {
                            if (prop[0] === 'price') {
                                setPrice(prop[1]);
                            }
                        });
                    }
                });
            });
        }
        if (wallet.walletCurrency === 'Bitcoin') {
            response.forEach((currency) => {
                currency.forEach((prop) => {
                    if (prop[1] === 'BTC/RUB') {
                        currency.forEach((prop) => {
                            if (prop[0] === 'price') {
                                setPrice(prop[1]);
                            }
                        });
                    }
                });
            });
        }
    };

    prizm.get_currency_prices()
        .then((resp) => currencyAmount(resp, qrData))
        .catch((e) => console.log(e));



    const spinValue = new Animated.Value(0);

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
        outputRange: ['360deg', '0deg']
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
        const cryptoAmount = parseFloat(amount / price).toFixed(3);
        const percentage = parseFloat((cryptoAmount * 10) / 100).toFixed(3);
        const sum = (parseFloat(cryptoAmount) + parseFloat(percentage)).toFixed(3);

        const codeGenerator = (qrData) => {
            return `${ qrData.walletID }:${ qrData.walletPublicKey }:${ sum }`;
        };
        content = (
            <>
            <QRCode value={ codeGenerator(qrData) }
                    size={ Dimensions.get('window').width - 40 }
                    color={ THEME.WHITE_COLOR }
                    backgroundColor={ THEME.BLACK_COLOR }/>
                <RegularText>
                    { `Сумма: ${ sum } PZM` }
                </RegularText>
                <RegularText>
                    { `Текущий курс: 1 PZM = ${ price } ₽` }
                </RegularText>
            </>
        );
    }

    return (
       <Modal animationType={ 'slide' }
              transparent={ false }
              visible={ visible }>
           <View style={ styles.container }>
               {/*<QRCode value={ codeGenerator(qrData, amount) }*/}
               {/*        size={ Dimensions.get('window').width - 40 }*/}
               {/*        color={ THEME.WHITE_COLOR }*/}
               {/*        backgroundColor={ THEME.BLACK_COLOR }/>*/}
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