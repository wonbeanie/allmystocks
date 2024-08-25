import React from 'react'
import Test from './Test'
import Counter from './components/Counter'
import { useAppSelector } from './hooks';
import { selectCount } from './store/counter';
import StockState from './screens/stockstate';
import Financial from './screens/financial';
import StockHistory from './screens/stockhistory';
import Layout from './screens/layout';

export default function App() {

  return (
    <div>
      <StockState />
      <Financial />
      <StockHistory />
      <Layout />
    </div>
  ) 
}