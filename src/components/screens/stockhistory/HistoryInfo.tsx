import styled from '@emotion/styled'
import React from 'react'

export default function HistoryInfo() {
    return (
        <Container>
            <NameBox>
                삼성전자 - 85,151
            </NameBox>
            <InfoBox>
                <ProfitBox>
                    30.5%
                </ProfitBox>
                <div>
                    (1,521,352)
                </div>
            </InfoBox>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    margin-bottom : 20px;
`;

const NameBox = styled.div`
    flex : 1;
`;

const InfoBox = styled.div`
    display: flex;
    flex : 1;
    justify-content: flex-end;
    align-items: center;
`;

const ProfitBox = styled.div`
    margin-right : 5px;
`;