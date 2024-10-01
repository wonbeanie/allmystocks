import styled from '@emotion/styled';
import React from 'react'
import { marginBottom } from '../../../../css/screens/layout';

export default function StockBox() {
    return (
        <Container>
            <div css={marginBottom}>
                총 투입 금액 : 32,153,142
            </div>
            <div css={marginBottom}>
                현 투입 금액 : 15,243,151
            </div>
            <div css={marginBottom}>
                총 수익률 : 2.5%
            </div>
            <div>
                현 수익률 : 13.5%
            </div>
        </Container>
    )
}

const Container = styled.div`
    flex : 1;
    text-align : right;
`;

const Box = styled.div`
    marginBottom : 
`;