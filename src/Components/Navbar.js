import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AntDesign, SimpleLineIcons, Foundation } from '@expo/vector-icons';

import { AppButton } from './UI/AppButton';
import { THEME } from "../THEME";

export const Navbar = ({ screenSelect }) => {
    return (
        <View style={ styles.navbar }>
            <AppButton onPress={ () => screenSelect('QR') }
                       onLongPress={ () => screenSelect(null) }
            >
                <AntDesign name={ 'qrcode' } size={ 30 }/>
            </AppButton>
            <AppButton onPress={ () => screenSelect('HISTORY') }
                       onLongPress={ () => screenSelect(null) }
            >
               <Foundation  name={ 'database' } size={ 30 }/>
            </AppButton>
            <AppButton onPress={ () => screenSelect('WALLET') }
                       onLongPress={ () => screenSelect(null) }
            >
                <SimpleLineIcons name={ 'wallet' } size={ 30 }/>
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: THEME.MAIN_COLOR,
        padding: 15
    }
});