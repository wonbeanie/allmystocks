import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import ApiService from '../../modules/api/ApiService';
import { appKeysType } from '../../modules/api/apitype';

interface initialStateType {
    items: Object,
    status: string,
    error: string | null,
}

const initialState : initialStateType = {    // 초기 state(상태값) 설정
    items: [],
    status: 'idle',
    error: null,
}

// 비동기 작업을 처리하는 createAsyncThunk 생성
export const fetchToken = createAsyncThunk<
    any
>('stock/token', async () => {
    const response = await ApiService.getStockApiAccessToken();
    console.log(response);
    return response.data;
});

export const fetchStockPrice = createAsyncThunk<
    any,
    any
>('stock/price', async (stockId : string) => {
    const response = await ApiService.getStock(stockId);
    return response.data;
});

export const fetchUsStockPrice = createAsyncThunk<
    any,
    any
>('stock/us-price', async (stockName : string) => {
    const response = await ApiService.getUsStock(stockName);
    return response.data;
});

// Redux Toolkit 슬라이스 생성
const stockApiSlice = createSlice({
    name: 'stock',  // slice명 설정
    initialState,
    reducers: {}, // 동기적 처리를 하는 곳 cf)
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockPrice.fulfilled, (state, action) => {
              // 2. 비동기 작업이 성공적으로 완료된 경우의 액션
                state.status = 'succeeded';
                state.items = action.payload;  // 타 서버에서 가져온 내용을 통신소 DB에 저장
                console.log("succeeded")
            })
            .addCase(fetchUsStockPrice.fulfilled, (state, action) => {
              // 2. 비동기 작업이 성공적으로 완료된 경우의 액션
                state.status = 'succeeded';
                state.items = action.payload;  // 타 서버에서 가져온 내용을 통신소 DB에 저장
                console.log("succeeded")
            })
            .addCase(fetchStockPrice.rejected, (state, action) => {
              // 3. 비동기 작업이 실패한 경우의 액션
                state.status = 'failed';
                // state.error = action.error.message;
                if(action.error.message){
                    state.error = action.error.message;
                }
                console.log("failed")
            });
        },
});


export default stockApiSlice.reducer;
export const selectPosts = (state: RootState) => state.apiData; // 추가

// export const counterActions = counterSlice.actions;
// export default counterSlice.reducer;