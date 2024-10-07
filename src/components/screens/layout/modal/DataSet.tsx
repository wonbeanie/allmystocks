import styled from '@emotion/styled'
import { InputContainer, NameBox, TextInput } from '../../../../css/screens/layout/modal';
import DataFileInput from './DataFileInput';
import { useState } from 'react';
import { delComma, formatComma } from '../../../../modules/modules';

export default function DataSet({dataState, setDataState} : dataSetConfigProps) {
    const [exchangeUsRate, setExchangeUsRate] = useState("");

    const changeAppKey = (e : any) => {
        changeDataConfig(dataConfigEnum.APPKEY, e.target.value)
    }

    const changeAppSecret = (e : any) => {
        changeDataConfig(dataConfigEnum.APPSECRET, e.target.value)
    }

    const changeDepositsRate = (e : any) => {
        changeDataConfig(dataConfigEnum.DEPOSITS_RATE, e.target.value)
    }

    const changeInstallmentSavingRate = (e : any) => {
        changeDataConfig(dataConfigEnum.INSTALLMENT_SAVEING_RATE, e.target.value)
    }

    const changeExchangeUsRate = (e : any) => {
        //천의 자리 콤마 변환
        let value = delComma(e.target.value);
        value = formatComma(Number(value));

        setExchangeUsRate(value);
        changeDataConfig(dataConfigEnum.EXCHANGE_US_RATE, value);
    }

    //부모 컴포넌트에 데이터 전달
    const changeDataConfig = (key : dataConfigEnum, value : string) => {
        let dataConfigTemp = {...dataState}
        dataConfigTemp[key] = value;
        setDataState(dataConfigTemp)
    }

    //부모 컴포넌트에 데이터 전달
    const changeFiles = (files : File[]) => {
        let dataConfigTemp = {...dataState}
        dataConfigTemp[FILES_KEY] = files;
        setDataState(dataConfigTemp)
    }

    return (
        <Container>
            <InputContainer>
                <NameBox>
                    appkey
                </NameBox>
                <InputBox>
                    <TextInput placeholder='ex) hkeGH37HGDKQgvghwj5dBmFKGNvvSGR…' onChange={changeAppKey}/>
                </InputBox>
            </InputContainer>
            <InputContainer>
                <NameBox>
                    appsecret
                </NameBox>
                <InputBox>
                    <TextInput placeholder='ex) HGKEfgkgjhg7sGwhjeGfkfjfjGjW5EDhDgb…' onChange={changeAppSecret}/>
                </InputBox>
            </InputContainer>

            <InterestRateBox>
                <InputContainer css={{
                    marginRight : 10
                }}>
                    <NameBox>
                        예금 금리
                    </NameBox>
                    <InputBox>
                        <TextInput placeholder='ex) 3.8' onChange={changeDepositsRate}/>
                    </InputBox>
                </InputContainer>
                <InputContainer>
                    <NameBox>
                        적금 금리
                    </NameBox>
                    <InputBox>
                        <TextInput placeholder='ex) 4.2' onChange={changeInstallmentSavingRate}/>
                    </InputBox>
                </InputContainer>
            </InterestRateBox>

            <InputContainer>
                <NameBox>
                    환율
                </NameBox>
                <InputBox>
                    <TextInput value={exchangeUsRate} placeholder='ex) 1,328' onChange={changeExchangeUsRate}/>
                </InputBox>
            </InputContainer>

            <DataFileInput files={dataState.files} changeFiles={changeFiles} />
        </Container>
    )
}

const Container = styled.div`
    margin-bottom : 20px;
`;

const InterestRateBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const InputBox = styled.div`
    flex: 1;
    border : 1px solid #000000;
    padding : 5px 0;
`;

interface dataSetConfigProps {
    dataState : dataSetStateType,
    setDataState : (dataState : dataSetStateType) => void
}

type dataConfigType = {
    [key in dataConfigEnum]: string;
}

export const FILES_KEY = "files";

export interface dataSetStateType extends dataConfigType {
    [FILES_KEY] : File[];
}

const enum dataConfigEnum {
    APPKEY = "appKey",
    APPSECRET = "appSecret",
    DEPOSITS_RATE = "depositsRate",
    INSTALLMENT_SAVEING_RATE = "installmentSavingRate",
    EXCHANGE_US_RATE = "exchangeUSRate"
}