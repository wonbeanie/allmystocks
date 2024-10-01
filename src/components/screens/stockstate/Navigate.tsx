import styled from '@emotion/styled';
import React from 'react'

export default function Navigate() {
    return (
        <Container>
            <Btn css={{
                marginRight : 10
            }}>
                현재가 변경
            </Btn>
            <Btn css={{
                marginRight : 10
            }}>
                과거내역
            </Btn>
            <Btn>
                금융상품
            </Btn>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    flex-direction: row;
    flex : 1;
    justify-content : flex-end;
    alignItems : center;
`;

const Btn = styled.button`
    border: 1px solid #000000;
    width : 80px;
    padding : 5px 0;
    text-align: center;
    background: unset;
`;