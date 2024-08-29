import styled from '@emotion/styled'
import React from 'react'

export default function FinancialDetails() {
    return (
        <Container>
            <InfoBox>
                <InfoName>
                    예금
                </InfoName>
                <InfoValue>
                    81,651
                </InfoValue>
            </InfoBox>

            <InfoBox>
                <InfoName>
                    적금
                </InfoName>
                <InfoValue>
                    62,152
                </InfoValue>
            </InfoBox>
            <InfoBox>
                <InfoName>
                    총 순이익
                </InfoName>
                <InfoValue>
                    35,000
                </InfoValue>
            </InfoBox>
            <InfoBox>
                <InfoName>
                    평균 배당금
                </InfoName>
                <InfoValue>
                    40,000
                </InfoValue>
            </InfoBox>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    flex-direction : column;
    margin-bottom : 30px;

    & > div:last-child {
        margin-bottom : unset;
    }
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