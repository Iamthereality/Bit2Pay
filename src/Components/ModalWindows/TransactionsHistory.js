import React from 'react';
import { View, Modal, FlatList, StyleSheet, Dimensions } from 'react-native';

import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { RegularText } from "../UI/RegularText";
import { AppButton } from "../UI/AppButton";
import { THEME } from "../../THEME";
import { ThinText } from "../UI/ThinText";

export const TransactionsHistory = ({ visibility, setVisibility, wallet, deleteTransactions }) => {

    const timeConverter = (UNIX_timestamp) => {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    };

    let currency;

    const header = wallet.transactions !== undefined ?
        <View style={ styles.headerContainer }>
            <View style={ styles.header }>
                <RegularText style={ { fontSize: 22 } }>
                    { 'Список транзакций' }
                </RegularText>
                <AppButton buttonStyle={ styles.closeButton }
                           onPress={ () => setVisibility(false) }>
                    <AntDesign name={ 'close' } size={ 20 }/>
                </AppButton>
            </View>
            <AppButton buttonStyle={ styles.deleteTransactions }
                       onPress={ () => {
                           deleteTransactions(wallet.id);
                       } }
            >
                { 'Удалить транзакции' }
            </AppButton>
        </View> :
        <View style={ styles.header }>
            <RegularText style={ { fontSize: 22 } }>
                { 'Список транзакций' }
            </RegularText>
            <AppButton buttonStyle={ styles.closeButton }
                       onPress={ () => setVisibility(false) }>
                <AntDesign name={ 'close' } size={ 20 }/>
            </AppButton>
        </View>;

    const content = wallet.transactions !== undefined ?
        <FlatList data={ wallet.transactions }
                  keyExtractor={ (item) => item.id.toString() }
                  renderItem={ ({ item }) => {
                      const date = timeConverter(parseInt(item.id.toString().slice(0, 10)));
                      if (wallet.walletCurrency === 'Prizm') {
                          currency = `${ item.cryptoAmount } PZM`;
                      }

                      if (wallet.walletCurrency === 'Ethereum') {
                          currency = (
                              <>
                                  {`${ item.cryptoAmount } `}
                                  <MaterialCommunityIcons name={ 'ethereum' } size={ 20 }/>
                              </>
                          );
                      }

                      if (wallet.walletCurrency === 'Bitcoin') {
                          currency = (
                              <>
                                  {`${ item.cryptoAmount } `}
                                  <FontAwesome name={ 'bitcoin' } size={ 20 }/>
                              </>
                          );
                      }
                      return (
                          <View style={ styles.itemContainer }>
                              <RegularText style={ styles.itemLabel }>
                                  { date }
                              </RegularText>
                              <View style={ styles.txDetails }>
                                  <ThinText>
                                      { `${ item.amountRUB } ₽` }
                                  </ThinText>
                                  <ThinText>
                                      { currency }
                                  </ThinText>
                              </View>
                          </View>
                      );
                  } }
        /> :
        <RegularText>
            { 'Нет транзакий' }
        </RegularText>;

    return (
        <Modal animationType={ 'slide' }
               transparent={ false }
               visible={ visibility }>
            <View style={ styles.container }>
                { header }
                { content }
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME.BLACK_COLOR
    },
    headerContainer: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    closeButton: {
        width: 50,
        borderColor: 'transparent'
    },
    deleteTransactions: {
        width: '55%'
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderColor: THEME.MAIN_COLOR,
        borderTopWidth: 0.5
    },
    itemLabel: {
        padding: 10
    },
    txDetails: {
        width: Dimensions.get('window').width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 0.5,
        borderColor: THEME.WHITE_COLOR,
        borderRadius: 50,
        marginBottom: 20
    }
});