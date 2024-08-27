import styled from '@emotion/styled';
import React from 'react'
import { marginBottom } from '../../../../css/screens/layout';

export default function FinancialBox() {
    return (
        <Container>
            <div css={marginBottom}>
                예금 금리 : 3.8%
            </div>
            <div css={marginBottom}>
                적금 금리 : 4.2%
            </div>
            <div>
                <Button>
                    데이터 설정
                </Button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction : column;
    flex: 1;
`;

const Button = styled.button`
    position : absolute;
    padding : 5px 10px 5px 10px;
    border : 1px solid #000000;
    background-color : #ffffff;
    border-radius : 5px;
`;