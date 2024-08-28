import React from 'react'
import container from '../../css/screens/stockstate'
import StockInfo from '../../components/screens/stockstate/StockInfo'
import StockDetails from '../../components/screens/stockstate/StockDetails'
import styled from '@emotion/styled'

export default function StockState() {
  return (
    <div css={container}>
        <div css={{
            borderBottom : "1px solid #dddddd",
        }}>
            <StockInfo />
            <StockDetails />
        </div>
        <div css={{
            marginTop : 30,
            borderBottom : "1px solid #dddddd",
        }}>
            <StockInfo />
            {/* <StockDetails /> */}
        </div>
        <div css={{
            marginTop : 30,
        }}>
            <StockInfo />
            {/* <StockDetails /> */}
        </div>
    </div>
  )
}