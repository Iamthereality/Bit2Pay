import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Modal, Dimensions } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { THEME } from "../THEME";
import { AppButton } from "./UI/AppButton";
import  Prizm  from "../Services/Prizm";

export const QRModalWindow = ({ setVisibility, visible, qrData, clear, amount }) => {
    const prizm = new Prizm();

    const currencyAmount = (response, wallet) => {
        if (wallet.walletCurrency === 'Prizm') {
           response[0]['marketName'];
        }
    };

    prizm.get_currency_prices()
        .then((resp) => currencyAmount(resp, qrData))
        .catch((e) => console.log(e));


    const codeGenerator = (qrData, amount) => {
        return `${ qrData.walletID }:${ qrData.walletPublicKey }:${ amount }`
    };

    return (
       <Modal animationType={ 'slide' }
              transparent={ false }
              visible={ visible }>
           <View style={ styles.container }>
               <QRCode value={ codeGenerator(qrData, amount) }
                       size={ Dimensions.get('window').width - 40 }
                       color={ THEME.WHITE_COLOR }
                       backgroundColor={ THEME.BLACK_COLOR }/>
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
    }
});