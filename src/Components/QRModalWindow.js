import React from 'react';
import { View, StyleSheet, Modal, Dimensions } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { THEME } from "../THEME";
import { AppButton } from "./UI/AppButton";

export const QRModalWindow = ({ setVisibility, visible, qrData, clear }) => {
    return (
       <Modal animationType={ 'slide' }
              transparent={ false }
              visible={ visible }>
           <View style={ styles.container }>
               <QRCode value={ JSON.stringify(qrData) }
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