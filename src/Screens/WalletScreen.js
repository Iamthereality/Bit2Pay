import React from 'react';

import { AppScreen } from "../Components/UI/AppScreen";
import { Header } from '../Components/UI/Header';

export const WalletScreen = ({ onHomePress, style, title }) => {
    return (
        <AppScreen style={ style } >
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
        </AppScreen>
    );
};