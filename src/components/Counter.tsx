import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { counterActions, selectCount } from '../redux/slice/counter';
import { fetchToken } from '../redux/slice/stockApi';
import axios from 'axios';
import ApiService from '../modules/api/ApiService';

const Counter = () => {
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.apiData);
  const [appKey, setAppKey] = useState("");
  const [appSecret, setAppSecret] = useState("");

  const addHandler = () => {
    dispatch(counterActions.add(10));
  };
  
  const subHandler = () => {
    dispatch(counterActions.sub(10));
  };

  const apiHandler = async () => {
    try {
        // let res = await ApiService.getStockPrice("005935");
        let res = await ApiService.getUsStock("iShares Expanded Tech Sector ETF");
        console.log(res);
    } catch (err) {
        console.log(err);
    }
    // dispatch(fetchToken());
    // console.log(items, status, error);
  }

  const setKey = () => {
    console.log({appKey, appSecret});
    ApiService.setKeys({appKey, appSecret});
  }

  const onAppKey = (e : any) => {
    setAppKey(e.target.value)
  }

  const onAppSecret = (e : any) => {
    setAppSecret(e.target.value)
  }

  useEffect(()=>{

  },[])

  return (
    <div>
      <h2>{counter}</h2>
      <div>
        <button onClick={addHandler}>더하기</button>
        <button onClick={subHandler}>빼기</button>
        <br/>
        <br/>
        <input onChange={onAppKey} placeholder='appKey' />
        <input onChange={onAppSecret} placeholder='appSecret' />
        <button onClick={setKey}>Set Keys</button>

        <br/>
        <button onClick={apiHandler}>Request</button>
      </div>
    </div>
  );
};

export default Counter;