import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { THEME } from "../THEME";
import { ThinText } from "./UI/ThinText";
import { RegularText } from "./UI/RegularText";
import { EditWalletDataModalWindow } from "./ModalWindows/EditWalletDataModalWindow";

export const WalletsList = ({ item, updateWalletData }) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const [visible, setVisibility] = useState(false);
    return (
        <View style={ styles.container }>
            <Wrapper activeOpacity={ 0.7 }
                     onPress={ () => setVisibility(true) }
                     background={ TouchableNativeFeedback.Ripple(THEME.WHITE_COLOR, true) }
            >
                <View style={ styles.innerContainer }>
                    <EditWalletDataModalWindow visible={ visible }
                                               wallet={ item }
                                               setVisibility={ setVisibility }
                                               updateWalletData={ updateWalletData }/>
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
        justifyContent: 'space-between'
    },
    title: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontSize: 20,
        color: THEME.WHITE_COLOR,
    },
    data: {
        paddingHorizontal: 10,
        paddingVertical: 15
    }
});