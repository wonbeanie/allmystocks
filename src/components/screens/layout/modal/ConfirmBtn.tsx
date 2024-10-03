import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LayoutContext } from '../LayoutContext';
import { useContext } from 'react';

export default function ConfirmBtn({onConfirm = () => {}} : confirmBtnProps) {
    const layoutContext = useContext(LayoutContext);

    const onClose = () => {
        layoutContext.modalOpen(false);
    }

    return (
        <Container>
            <Btn css={centerStyle} onClick={onConfirm}>
                확인
            </Btn>
            <Btn onClick={onClose}>
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

interface confirmBtnProps {
    onConfirm ?: () => void
}