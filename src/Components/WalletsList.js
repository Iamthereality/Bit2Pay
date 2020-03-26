import React from 'react';
import {View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';

import { THEME } from "../THEME";
import { ThinText } from "./UI/ThinText";
import { RegularText } from "./UI/RegularText";

export const WalletsList = ({ item, openWallet }) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={ styles.container }>
            <Wrapper activeOpacity={ 0.7 }
                     onPress={ () => console.log('wallet') }
                     background={TouchableNativeFeedback.Ripple(THEME.WHITE_COLOR, true)}
            >
                <View style={ styles.innerContainer }>
                    <RegularText style={ styles.title }>
                        { item.walletCurrency }
                    </RegularText>
                    <ThinText style={ styles.data }>
                        { item.walletID }
                    </ThinText>
                </View>
            </Wrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: THEME.WHITE_COLOR,
        borderRadius: 50
    },
    innerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        padding: 15,
        fontSize: 20,
        color: THEME.WHITE_COLOR,
    },
    data: {
        padding: 15
    }
});