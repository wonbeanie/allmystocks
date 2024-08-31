import styled from '@emotion/styled'
import React from 'react'

export default function Modal({children} : modalType) {
    return (
        <Container>
            <Box>
                <ExitBtn>
                    X
                </ExitBtn>
                {children}
            </Box>
        </Container>
    )
}

interface modalType {
    children ?: React.ReactNode
}

const Container = styled.div`
    position: absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    z-index : 999;
`;

const Box = styled.div`
    background-color : #ffffff;
    position: relative;
    width : 500px;
    min-height : 100px;
    border: 1px solid #000000;
    top : 40%;
    bottom : 50%;
    left : 50%;
    right : 50%;
    transform : translate(-50%,-50%);
    padding : 30px 20px 30px 20px;
`;

const ExitBtn = styled.button`
    position: absolute;
    top : 0;
    right : 0;
    padding : 5px;
    font-size : 18px;
    background : unset;
    border : unset;
    cursor : pointer;
    font-weight : bold;
`;