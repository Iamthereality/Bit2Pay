import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { THEME } from "../THEME";
import {AppButton} from "./UI/AppButton";

export const AddForm = ({ address, setAddress, placeholder }) => {
    const t = '63a7d5404e28302ec7039ecc5f24e38e9870342044c040f29cd48c9a6bbd2e2e';

    console.log(t.length);

    return (
        <View style={ styles.container }>
            <View style={ styles.inputContainer }>
                <TextInput placeholder={ placeholder }
                           value={ address }
                           onChangeText={ (text) => setAddress(text) }
                           style={ styles.input }/>

            </View>
            <AppButton buttonStyle={ styles.button }
                       textStyle={ styles.buttonText }
                       onPress={ () => console.log(`test`) }>
                { '+' }
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        marginVertical: 10,
        width: '80%',
        padding: 10,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: THEME.WHITE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        width: '95%',
        height: 30,
        color: THEME.WHITE_COLOR,
        borderBottomWidth: 0.5,
        borderBottomColor: THEME.MAIN_COLOR
    },
    button: {
        width: 50,
        marginVertical: 0
    },
    buttonText: {
        fontSize: 26
    }
});