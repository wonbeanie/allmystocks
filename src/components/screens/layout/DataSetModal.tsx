import { useState } from 'react';
import ConfirmBtn from './modal/ConfirmBtn'
import DataSet from './modal/DataSet'
import { useAppDispatch } from '../../../redux/hooks';
import { basicInfoActions } from '../../../redux/slice/basicInfo';
import fileImport from '../../../modules/fileImport';
import { basicDataListActions } from '../../../redux/slice/baseDataList';
import { dataSetStateType, FILES_KEY } from './modal/modalTypes';

export default function DataSetModal() {
    const dispatch = useAppDispatch();
    //모달에서 저장되는 모든 데이터 변수
    const [dataState , setDataState] = useState(initData);

    //확인 버튼 클릭시 기능
    const onConfirm = async () => {
        //redux, localStorage 데이터 저장
        let {files, ...config} = dataState;
        dispatch(basicInfoActions.setDataConfig(config));

        //tsv파일 object[]로 변환
        //redux, localStorage 데이터 저장
        let fileData = await fileImport(files) || [];
        dispatch(basicDataListActions.setFilesData(fileData));
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