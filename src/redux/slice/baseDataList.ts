import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { financial, stockHistory, stocksDataList, stockState, tradeHistoryData } from '../../modules/stock/stockTypes';
import { detailContextFilter, roofFilterUseData, tradeTypeFilter } from '../../modules/stock/stock';

interface baseDataListState {
    data : stocksDataList
}

const initialState : baseDataListState = {
    data : {}
};

export const BASIC_DATA_LIST_STROAGE_KEY = "basicDataList";

export const baseDataListSlice = createSlice({
    name: 'basicDataList',
    initialState,
    reducers: {
        setInit : (state) => {
            let data = JSON.parse(localStorage.getItem(BASIC_DATA_LIST_STROAGE_KEY) || "{}");

            state.data = data;
        },
        setFilesData: (state, action: PayloadAction<filesDataPayload>) => {
            let filterData = tradeTypeFilter(action.payload);
            
            filterData = detailContextFilter(filterData);
    
            let result = roofFilterUseData(filterData);

            localStorage.setItem(BASIC_DATA_LIST_STROAGE_KEY,JSON.stringify(result));

            state.data = result;
        },
        sub: (state, action: PayloadAction<number>) => {
            // state.counter -= action.payload;
        },
    },
});

export const basicDataListActions = baseDataListSlice.actions;
export const getBaseDataList = (state: RootState) => state.baseDataList; // 추가
export default baseDataListSlice.reducer;

export type filesDataPayload = tradeHistoryData[];