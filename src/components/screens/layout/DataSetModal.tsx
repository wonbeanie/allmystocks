import { useEffect, useState } from 'react';
import ConfirmBtn from './modal/ConfirmBtn'
import DataSet from './modal/DataSet'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { basicInfoActions, getBasicInfo } from '../../../redux/slice/basicInfo';

export default function DataSetModal() {
    const basicInfo = useAppSelector(getBasicInfo);
    const dispatch = useAppDispatch();
    const [dataConfig , setDataConfig] = useState(initData)

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        setDataConfig(getLocalStorage());
    }

    const getLocalStorage = () => {
        let data = localStorage.getItem("dataConfig") || "{}";
        return JSON.parse(data) || initData;
    }

    const setLocalStorage = (dataConfig : any) => {
        localStorage.setItem("dataConfig", JSON.stringify(dataConfig));
    }

    const onConfirm = () => {
        setLocalStorage(dataConfig);
        dispatch(basicInfoActions.setDataConfig({
            depositRate : dataConfig.depositsRate,
            installmentSavingRate : dataConfig.installmentSavingRate,
            exchangeUSRate : dataConfig.exchangeUSRate
        }));
    }

    return (
        <div>
            <DataSet dataConfig={dataConfig} setDataConfig={setDataConfig} />
            <ConfirmBtn onConfirm={onConfirm} />
        </div>
    )
}

const initData =  {
    appKey : "",
    appSecret : "",
    depositsRate : "",
    installmentSavingRate : "",
    exchangeUSRate : ""
}