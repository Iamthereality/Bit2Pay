import React from 'react';
import { View, StyleSheet } from 'react-native';

import { THEME } from "../THEME";
import { ThinText } from "./UI/ThinText";
import { RegularText } from "./UI/RegularText";

export const WalletSelect = ({ item }) => {
    return (
        <View style={ styles.container }>
            <RegularText style={ styles.title }>
                { item.walletCurrency }
            </RegularText>
            <ThinText>
                { item.walletID }
            </ThinText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: THEME.WHITE_COLOR,
        borderRadius: 50
    },
    title: {
        padding: 10,
        fontSize: 20,
        color: THEME.WHITE_COLOR,
    }
});