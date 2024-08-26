import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slice/counter';
import stockApiReducer from '../slice/stockApi';

const store = configureStore({
    reducer: {
    	counter: counterReducer, // 추가됨
		  apiData : stockApiReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;