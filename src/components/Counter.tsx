import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectCount, counterActions } from '../store/counter';

const Counter = () => {
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  
  const addHandler = () => {
    dispatch(counterActions.add(10));
  };
  
  const subHandler = () => {
    dispatch(counterActions.sub(10));
  };

  return (
    <div>
      <h2>{counter}</h2>
      <div>
        <button onClick={addHandler}>더하기</button>
        <button onClick={subHandler}>빼기</button>
      </div>
    </div>
  );
};

export default Counter;