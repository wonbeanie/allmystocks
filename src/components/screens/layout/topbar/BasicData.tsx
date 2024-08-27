import styled from '@emotion/styled'
import React from 'react'
import FinancialBox from './FinancialBox';
import StockBox from './StockBox';

export default function BasicData() {
    return (
        <Container>
            <FinancialBox />
            <StockBox />
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    padding : 15px;
`;