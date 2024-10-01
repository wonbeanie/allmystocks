import { css } from '@emotion/react';
import styled from '@emotion/styled';

export default function ConfirmBtn() {
    return (
        <Container>
            <Btn css={centerStyle} >
                확인
            </Btn>
            <Btn>
                닫기
            </Btn>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
`;

const Btn = styled.div`
    border: 1px solid #000000;
    width : 80px;
    padding : 5px 0;
    font-size : 20px;
    text-align: center;
    border-radius : 10px;
`;

const centerStyle = css`
    margin-right : 10px;
`;