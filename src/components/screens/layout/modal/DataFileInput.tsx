import React from 'react'
import { InputBox, InputContainer, NameBox } from '../../../../css/screens/layout/modal'
import { textCenter } from '../../../../css/screens/layout'
import styled from '@emotion/styled';
import DataFileList from './DataFileList';

export default function DataFileInput() {
    return (
        <>
            <InputContainer>
                <NameBox>
                    데이터 파일
                </NameBox>
                <InputBox css={textCenter}>
                    <FileLabel htmlFor="file-input">
                        찾기
                    </FileLabel>
                    <FileInput id="file-input" type="file" multiple/>
                </InputBox>
            </InputContainer>
            <DataFileList />
        </>
    )
}


const FileLabel = styled.label`

`;

const FileInput = styled.input`
    display: none;
`;