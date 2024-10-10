import React, { useEffect, useState } from 'react'
import { InputBox, InputContainer, NameBox } from '../../../../css/screens/layout/modal'
import { textCenter } from '../../../../css/screens/layout'
import styled from '@emotion/styled';
import DataFileList from './DataFileList';
import fileImport from '../../../../modules/fileImport';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { basicDataListActions, getBaseDataList } from '../../../../redux/slice/baseDataList';
import { fileListType } from './modalTypes';
import JSZip from 'jszip';
import { fileDateSort } from '../../../../modules/modules';

export default function DataFileInput({files, changeFiles} : dataFileInputProps) {
    const [fileList, setFileList] = useState<fileListType>({});
    const baseDataList = useAppSelector(getBaseDataList);
    const [existsFile, setExistsFile] = useState(false);

    //데이터가 존재하는지 체크
    useEffect(()=>{
        let dataCheck = Object.keys(baseDataList.data).length > 0;
        setExistsFile(dataCheck ? true : false);
    },[baseDataList])

    //화면에서 받은 zip파일을 blob[]으로 변환뒤
    //상위 컴포넌트(DataSetModal)로 데이터 전달
    const onFiles = async (e : any) => {
        //압축해제를 위해 jszip 라이브러리 사용
        let zip = new JSZip();

        //압축 해제
        let unZipFiles = await zip.loadAsync(e.target.files[0])

        let blobList : Promise<Blob>[] = [];

        Object.keys(unZipFiles.files).forEach((key)=>{
            //blob으로 변환하기 위해 promise[]로 저장
            blobList.push(unZipFiles.files[key].async("blob"));
        })

        //blob으로 변환
        let list = await Promise.all(blobList)

        let fileList : fileListType = {};

        //입력된 파일을 보여줘야 되기 때문에
        //파일이름과 수정을 위한 위치값 저장
        fileList[e.target.files[0].name] = 0;

        setFileList(fileList);
        //데이터 전달
        changeFiles(list);
    }

    //파일 제거
    const removeFile = () => {
        changeFiles([]);
        setFileList({});

        //데이터 삭제 요청했기때문에
        setExistsFile(false);
    }

    return (
        <>
            <InputContainer>
                <NameBox>
                    데이터 파일
                </NameBox>
                <InputBox css={textCenter}>
                {
                    existsFile ? (
                        <DeleteFileBox onClick={removeFile}>
                            데이터 삭제
                        </DeleteFileBox>
                    ) : (
                        <>
                            <FileLabel htmlFor="file-input">
                                찾기
                            </FileLabel>
                            <FileInput id="file-input" type="file" onChange={onFiles}/>
                        </>
                    )
                }
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

const DeleteFileBox = styled.input`

`;

interface dataFileInputProps {
    files : Blob[];
    changeFiles : (files : Blob[]) => void;
}