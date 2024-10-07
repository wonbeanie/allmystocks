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

export const BASE_INFO_STROAGE_KEY = "dataConfig";

export const basicinfoSlice = createSlice({
    name: 'basicInfo',
    initialState,
    reducers: {
        setInit : (state) => {
            let data = JSON.parse(localStorage.getItem(BASE_INFO_STROAGE_KEY) || "{}");

            state.depositsRate = data.depositsRate;
            state.installmentSavingRate = data.installmentSavingRate;
            state.exchangeUSRate = data.exchangeUSRate;
        },
        setDataConfig: (state, action: PayloadAction<dataConfigPayload>) => {
            let config = action.payload;
            state.depositsRate = config.depositsRate;
            state.installmentSavingRate = config.installmentSavingRate;
            state.exchangeUSRate = config.exchangeUSRate;

            localStorage.setItem(BASE_INFO_STROAGE_KEY, JSON.stringify(config));
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
    appKey : string;
    appSecret : string;
    depositsRate : string;
    installmentSavingRate : string;
    exchangeUSRate : string;
}