import React, { useState } from 'react';

import { AppScreen } from "../Components/UI/AppScreen";
import { ThinText } from "../Components/UI/ThinText";
import { Header } from '../Components/UI/Header';

export const HistoryScreen = ({ onHomePress, style, title }) => {
    const [historyItem, setHistoryItem] = useState([]);
    return (
        <AppScreen style={ style } >
            <Header onHomePress={ onHomePress }>
                { title }
            </Header>
        </AppScreen>
    );
};