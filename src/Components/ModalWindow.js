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
               <QRCode value={ qrData }
                       size={ Dimensions.get('window').width - 40 }
                       color={ THEME.WHITE_COLOR }
                       backgroundColor={ THEME.BLACK_COLOR }/>
               <AppButton onPress={ () => setVisibility(false) }>
                   { 'Готово' }
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
    }
});