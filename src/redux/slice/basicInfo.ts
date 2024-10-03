import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface basicInfoState {
    totalInputAmount : string;
    exchangeUSRate : string;
    depositsRate : string;
    installmentSavingRate : string;
    currentReturn : string;
    totalReturnRate : string;
}

const initialState: basicInfoState = {
    totalInputAmount : "0",
    exchangeUSRate : "0",
    depositsRate : "0",
    installmentSavingRate : "0",
    currentReturn : "0",
    totalReturnRate : "0"
}

export const basicinfoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setDataConfig: (state, action: PayloadAction<dataConfigPayload>) => {
            state.depositsRate = action.payload.depositRate;
            state.installmentSavingRate = action.payload.installmentSavingRate;
            state.exchangeUSRate = action.payload.exchangeUSRate;
        },
        sub: (state, action: PayloadAction<number>) => {
            // state.counter -= action.payload;
        },
    },
});

export const basicInfoActions = basicinfoSlice.actions;
export const getBasicInfo = (state: RootState) => state.basicInfo; // 추가
export default basicinfoSlice.reducer;

export interface dataConfigPayload {
    depositRate : string;
    installmentSavingRate : string;
    exchangeUSRate : string;
}