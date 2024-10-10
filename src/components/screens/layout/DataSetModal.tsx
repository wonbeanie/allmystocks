import { useContext, useEffect, useState } from 'react';
import ConfirmBtn from './modal/ConfirmBtn'
import DataSet from './modal/DataSet'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { basicInfoActions, getBasicInfo } from '../../../redux/slice/basicInfo';
import fileImport from '../../../modules/fileImport';
import { basicDataListActions, getBaseDataList } from '../../../redux/slice/baseDataList';
import { dataSetStateType, FILES_KEY } from './modal/modalTypes';
import { LayoutContext } from './LayoutContext';
import { fileDateSort } from '../../../modules/modules';
import { file } from 'jszip';
import AppKeys from '../../../modules/AppKeys';

export default function DataSetModal() {
    const layoutContext = useContext(LayoutContext);
    const dispatch = useAppDispatch();
    //모달에서 저장되는 모든 데이터 변수
    const [dataState, setDataState] = useState(initData);
    const baseDataList = useAppSelector(getBaseDataList);
    const basicInfo = useAppSelector(getBasicInfo);

    //초기화
    useEffect(()=>{
        dispatch(basicDataListActions.setInit())
        dispatch(basicInfoActions.setInit())
        AppKeys.init();
    },[])

    //redux가 변경될때
    useEffect(()=>{
        onChangeRedux();
    },[baseDataList, basicInfo]);

    //변경된 데이터 불러오기
    const onChangeRedux = () => {
        let {appKey, appSecret} = AppKeys.getKeys();
        let {depositsRate, exchangeUSRate, installmentSavingRate} = basicInfo;

        setDataState({
            appKey,
            appSecret,
            depositsRate,
            exchangeUSRate,
            installmentSavingRate,
            //파일은 수정된다면 삭제, 파일 변경 둘중하나이기 때문에
            //굳이 blob[]을 넣을 이유가 없음
            files : []
        });
    }

    //확인 버튼 클릭시 기능
    const onConfirm = async () => {
        //redux, localStorage 데이터 저장
        let {files, ...config} = dataState;
        dispatch(basicInfoActions.setDataConfig(config));

        //tsv파일 object[]로 변환
        //redux, localStorage 데이터 저장
        if(files.length > 0){
            let fileData = await fileImport(files) || [];
            fileData.sort(fileDateSort);
            dispatch(basicDataListActions.setFilesData(fileData));
        }

        //moda 닫기
        layoutContext.modalOpen(false);
    }

    return (
        <div>
            <DataSet dataState={dataState} setDataState={setDataState} />
            <ConfirmBtn onConfirm={onConfirm} />
        </div>
    )
}

const initData : dataSetStateType =  {
    [FILES_KEY] : [],
    appKey : "",
    appSecret : "",
    depositsRate : "",
    installmentSavingRate : "",
    exchangeUSRate : ""
}