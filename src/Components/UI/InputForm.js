import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { ThinText } from './ThinText';
import { THEME } from "../../THEME";

export const InputForm = ({ placeholder, keyboardType }) => {
    return (
        <View style={ styles.inputContainer }>
            <TextInput placeholder={ placeholder }
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 16,
        marginHorizontal: 10,
        width: '90%',
        height: 30,
        color: THEME.WHITE_COLOR,
        borderBottomWidth: 0.5,
        borderBottomColor: THEME.MAIN_COLOR
    }
});