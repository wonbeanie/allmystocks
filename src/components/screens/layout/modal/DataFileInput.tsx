import React, { useEffect, useState } from 'react'
import { InputBox, InputContainer, NameBox } from '../../../../css/screens/layout/modal'
import { textCenter } from '../../../../css/screens/layout'
import styled from '@emotion/styled';
import DataFileList from './DataFileList';
import fileImport from '../../../../modules/fileImport';
import { useAppDispatch } from '../../../../redux/hooks';
import { basicDataListActions } from '../../../../redux/slice/baseDataList';
import { fileListType } from './modalTypes';

export default function DataFileInput({files, changeFiles} : dataFileInputProps) {
    const [fileList, setFileList] = useState<fileListType>({});

    //화면에서 받은 파일 배열로 변환뒤
    //상위 컴포넌트(DataSetModal)로 데이터 전달
    const onFiles = (e : any) => {
        let fileList : fileListType = {};
        let data = [...e.target.files];

        //입력된 파일을 보여줘야 되기 때문에
        //파일이름과 수정을 위한 위치값 저장
        data.forEach((file : any, num : number)=>{
            fileList[file.name] = num;
        });

        setFileList(fileList);
        //데이터 전달
        changeFiles(data);
    }

    //파일 제거
    const removeFile = (num : number) => {
        let fileList : fileListType = {};
        let filesTemp : File[] = [];

        //위치값이용하여 파일 제거
        files.forEach((file : File, i : number)=>{
            if(num === i){
                return;
            }

            filesTemp.push(file);
            fileList[file.name] = filesTemp.length-1;
        });

        changeFiles(filesTemp);
        setFileList(fileList);
    }

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
                    <FileInput id="file-input" type="file" multiple onChange={onFiles}/>
                </InputBox>
            </InputContainer>
            <DataFileList fileList={fileList} removeFile={removeFile}/>
        </>
    )
}


const FileLabel = styled.label`

`;

const FileInput = styled.input`
    display: none;
`;

interface dataFileInputProps {
    files : File[];
    changeFiles : (files : File[]) => void;
}