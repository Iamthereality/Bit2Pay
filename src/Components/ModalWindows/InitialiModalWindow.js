import React, { useState, useCallback } from 'react';
import { Modal, View, StyleSheet, Linking } from 'react-native';

import { AppScreen } from "../UI/AppScreen";
import { RegularText } from "../UI/RegularText";
import { AppButton } from "../UI/AppButton";
import { THEME } from "../../THEME";

export const InitialModalWindow = ({ visible, setVisibility, screenSelect }) => {
    const [member, setMember] = useState(false);

    const toWallet = () => {
        setVisibility(() => {
            screenSelect('WALLET');
            return false;
        });
    };

    let content = (
        <>
            <RegularText style={ { fontSize: 22, textAlign: 'center' } }>
                { 'Являетесь участником рефелаьной программы?' }
            </RegularText>
            <View style={ styles.buttonContainer }>
                <AppButton buttonStyle={ styles.button }
                           onPress={ toWallet }
                >
                    { 'Да' }
                </AppButton>
                <AppButton buttonStyle={ styles.button }
                           onPress={ () => setMember(true) }
                >
                    { 'Нет' }
                </AppButton>
            </View>
        </>
    );

    const url = 'https://prizmbit.com?R=QYHZ';

    const refLInk = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url).then(toWallet);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    if (member) {
        content = (
            <>
                <RegularText style={ { fontSize: 26, textAlign: 'center' } }>
                    { 'Зарегистрироваться?' }
                </RegularText>

                <View style={ styles.buttonContainer }>
                    <AppButton buttonStyle={ styles.button }
                               onPress={ refLInk }
                    >
                        { 'да' }
                    </AppButton>
                    <AppButton buttonStyle={ styles.button }
                               onPress={ () => setMember(false) }
                    >
                        { 'нет' }
                    </AppButton>
                </View>
            </>
        );
    }

     return (
         <Modal animationType={ 'slide' }
                transparent={ false }
                visible={ visible }>
             <AppScreen style={ styles.container }>
                 { content }
                 <View/>
             </AppScreen>
         </Modal>
     );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.BLACK_COLOR,
        height: '100%'
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        width: '45%',
        marginVertical: 30
    }
});