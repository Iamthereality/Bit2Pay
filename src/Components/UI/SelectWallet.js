import React from 'react';
import { View, StyleSheet } from "react-native";

import { RegularText } from "./RegularText";
import { AppButton } from "./AppButton";

export const SelectWallet = ({ item, onPress }) => {
    let address;

    if (item.walletCurrency === 'Prizm') {
        address = item.prizmID.length > 25 ? `ID:  ${ item.prizmID.slice(0, 25) }...` : `ID:  ${ item.prizmID }`;
    } else if (item.walletCurrency === 'Ethereum' || item.walletCurrency === 'Bitcoin') {
        address = item.walletAddress.length > 25 ? `Адрес:  ${ item.walletAddress.slice(0, 25) }...` : `Адрес:  ${ item.walletAddress }`
    }

    return (
        <View style={ styles.itemContainer }>
            <RegularText style={ styles.itemLabel }>
                { item.walletCurrency }
            </RegularText>
            <AppButton buttonStyle={ styles.button }
                       textStyle={ { textAlign: 'left' } }
                       onPress={ () => onPress(item) }>
                { address }
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        paddingBottom: 10,
        paddingHorizontal: 5,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    itemLabel: {
        padding: 10
    },
    button: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 5
    }
});