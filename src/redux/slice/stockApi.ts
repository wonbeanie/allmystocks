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
    any,
    appKeysType
>('stock/token', async (appKeys : appKeysType) => {
    const response = await ApiService.getStockApiAccessToken(appKeys);

    return response.data;
});

// Redux Toolkit 슬라이스 생성
const stockApiSlice = createSlice({
    name: 'stock',  // slice명 설정
    initialState,
    reducers: {}, // 동기적 처리를 하는 곳 cf)
    extraReducers: (builder) => {
        builder
            .addCase(fetchToken.pending, (state) => {
            // 1. 비동기 작업이 시작될 때의 액션
                state.status = 'loading';
                console.log("loading")
            })
            .addCase(fetchToken.fulfilled, (state, action) => {
              // 2. 비동기 작업이 성공적으로 완료된 경우의 액션
                state.status = 'succeeded';
                state.items = action.payload;  // 타 서버에서 가져온 내용을 통신소 DB에 저장
                console.log("succeeded")
            })
            .addCase(fetchToken.rejected, (state, action) => {
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