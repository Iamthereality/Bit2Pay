import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { THEME } from "../THEME";

export const InputForm = ({ amount, setAmount, placeholder, keyboardType }) => {
    return (
        <View style={ styles.inputContainer }>
            <TextInput placeholder={ placeholder }
                       value={ amount }
                       onChangeText={ (text) => setAmount(text) }
                       style={ styles.input }
                       keyboardType={ keyboardType }/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        width: '100%',
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
    }
});