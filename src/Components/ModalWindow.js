import React from 'react';
import { View, StyleSheet, Modal, Dimensions } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { THEME } from "../THEME";
import { AppButton } from "./UI/AppButton";

export const ModalWindow = ({ setVisibility, visible, qrData }) => {
    return (
       <Modal animationType={ 'slide' }
              transparent={ false }
              visible={ visible }>
           <View style={ styles.container }>
               <QRCode style={ styles.qrContainer }
                       value={ qrData }
                       size={ Dimensions.get('window').width - 40 }
                       color={ THEME.BLACK_COLOR }
                       backgroundColor={ THEME.WHITE_COLOR }/>
               <AppButton onPress={ () => setVisibility(false) }>
                   { 'OK' }
               </AppButton>
           </View>
       </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME.BLACK_COLOR
    },
    // qrContainer: {
    //     width: '100%',
    //     padding: 10,
    //     backgroundColor: THEME.WHITE_COLOR
    // }
});