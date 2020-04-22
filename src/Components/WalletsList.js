import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { THEME } from "../THEME";
import { ThinText } from "./UI/ThinText";
import { RegularText } from "./UI/RegularText";
import { EditWalletDataModalWindow } from "./ModalWindows/EditWalletDataModalWindow";
import CryptAPI from "../Services/CryptAPI";

export const WalletsList = ({ item, updateWalletData, deleteWalletData }) => {
    const cryptAPI = new CryptAPI();
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const [visible, setVisibility] = useState(false);
    const [balance, setBalance] = useState(0);

    if (item.walletCurrency === 'Ethereum') {
        cryptAPI.get_ethereum_balance(item.walletAddress)
            .then((resp) => setBalance(parseInt(resp.result, 16) / 1e18))
            .catch((e) => console.log(e));
    }

    let address = item.walletAddress.length > 25 ? `Адрес:  ${ item.walletAddress.slice(0, 25) }...` : `Адрес:  ${ item.walletAddress }`;

    if (item.walletCurrency === 'Prizm') {
        address = item.prizmID.length > 25 ? `ID:  ${ item.prizmID.slice(0, 25) }...` : `ID:  ${ item.prizmID }`;
    }

    return (
        <View style={ styles.wrapper }>
            <View style={ styles.innerContainer }>
                <RegularText style={ styles.title }>
                    { item.walletCurrency }
                </RegularText>
                <ThinText style={ styles.data }>
                    { `баланс: ${ balance }` }
                </ThinText>
            </View>
            <View style={ styles.container }>
                <Wrapper activeOpacity={ 0.7 }
                         onPress={ () => setVisibility(true) }
                         onLongPress={ () => deleteWalletData(item.id) }
                         background={ TouchableNativeFeedback.Ripple(THEME.WHITE_COLOR, true) }
                >
                    <View style={ styles.innerContainer }>
                        <EditWalletDataModalWindow visible={ visible }
                                                   wallet={ item }
                                                   setVisibility={ setVisibility }
                                                   updateWalletData={ updateWalletData }
                                                   deleteWalletData={ deleteWalletData }
                        />
                        <ThinText style={ styles.data }>
                            { address }
                        </ThinText>
                    </View>
                </Wrapper>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderTopWidth: 0.5,
        borderColor: THEME.MAIN_COLOR
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: THEME.WHITE_COLOR,
        borderRadius: 50,
        marginBottom: 20
    },
    innerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        paddingHorizontal: 10,
        fontSize: 20,
        color: THEME.WHITE_COLOR,
    },
    data: {
        paddingHorizontal: 10,
        paddingVertical: 15
    }
});