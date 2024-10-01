import styled from '@emotion/styled'
import React from 'react'
import Navigate from './Navigate';

export default function StockDetails() {
    return (
        <Container>
            <InfoBox>
                <InfoName>
                    현재가
                </InfoName>
                <InfoValue>
                    43,500
                </InfoValue>
            </InfoBox>

            <InfoBox>
                <InfoName>
                    평단가
                </InfoName>
                <InfoValue>
                    40,000
                </InfoValue>
            </InfoBox>
            <InfoBox>
                <InfoName>
                    매수량
                </InfoName>
                <InfoValue>
                    352
                </InfoValue>
            </InfoBox>
            <InfoBox>
                <InfoName>
                    최초 구매 시기
                </InfoName>
                <InfoValue>
                    2023.04.25
                </InfoValue>
            </InfoBox>
            <InfoBox>
                <InfoName>
                    보유기간
                </InfoName>
                <InfoValue>
                    1년 11개월
                </InfoValue>
            </InfoBox>

            <Navigate />
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    flex-direction : column;
    margin-bottom : 30px;
`;

const InfoBox = styled.div`
    display : flex;
    flex : 1;
    margin-bottom : 20px;
`;

const InfoName = styled.div`
    flex : 1;
`;

const InfoValue = styled.div`
    flex : 1;
    text-align: right;
`;