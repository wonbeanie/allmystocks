import React from 'react'
import Test from './Test'
import Counter from './components/Counter'
import { useAppSelector } from './hooks';
import { selectCount } from './store/counter';

export default function App() {

  return (
    <div>
      <Counter />
    </div>
  ) 
}