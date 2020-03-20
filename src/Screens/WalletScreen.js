import React from 'react';

import { AppScreen } from "../Components/UI/AppScreen";
import { ThinText } from "../Components/UI/ThinText";

export const WalletScreen = ({ style, title }) => {
    return (
        <AppScreen style={ style } >
            <ThinText style={ { fontSize: 22 } }>
                { title }
            </ThinText>
        </AppScreen>
    );
};