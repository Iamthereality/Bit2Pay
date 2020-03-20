import React, { useState } from 'react';

import { AppScreen } from "../Components/UI/AppScreen";
import { ThinText } from "../Components/UI/ThinText";

export const HistoryScreen = ({ style, title, children }) => {
    const [historyItem, setHistoryItem] = useState([]);
    return (
        <AppScreen style={ style } >
            <ThinText style={ { fontSize: 22 } }>
                { title }
            </ThinText>
            { children }
        </AppScreen>
    );
};