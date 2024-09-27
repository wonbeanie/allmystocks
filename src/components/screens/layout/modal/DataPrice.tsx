import React from 'react'
import { InputBox, InputContainer, NameBox, TextInput } from '../../../../css/screens/layout/modal'
import { marginBottom, textCenter } from '../../../../css/screens/layout'
import styled from '@emotion/styled';
import DataFileList from './DataFileList';

export default function DataPrice() {
    return (
        <Container>
            <InputContainer>
                <NameBox>
                    현재가
                </NameBox>
                <InputBox>
                    <TextInput placeholder='ex) 12,151' />
                </InputBox>
            </InputContainer>
        </Container>
    )
}


const Container = styled.div`
    margin-bottom : 30px;
`;