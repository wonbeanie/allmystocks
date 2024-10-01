import styled from '@emotion/styled';
import React from 'react'

export default function DataFileList() {
    return (
        <Conatiner>
            <Box css={{
                marginBottom: 10
            }}>
                <DeleteBtn>
                    X
                </DeleteBtn>
                종합거래내역_이름_24_0702_1009.CSV
            </Box>
            <Box>
                <DeleteBtn>
                    X
                </DeleteBtn>
                종합거래내역_이름_24_1010_1228.CSV
            </Box>
        </Conatiner>
    )
}

const Conatiner = styled.div`
    display: flex;
    flex-direction : column;
`;

const Box = styled.div`
    flex: 1;
    text-align: center;
    padding : 5px 0;
    border : 1px solid #000000;
`;

const DeleteBtn = styled.button`
    position : absolute;
    right : 30px;
    font-weight : bold;
    background: unset;
    border : 1px solid #000000;
`;