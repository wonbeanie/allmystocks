import { calStringToNumber, cutPoint, delComma, formatComma } from '../modules';
import { calculator, stocksData, stocksDataList, stockType } from '../stock/stockTypes';
import {priceList, priceResData, usCodeFilesType, usCodeListType} from './priceTypes';
import usCodeFile from './uscodefile';

export const calPriceToStockData = (
    list : stocksDataList, priceList : priceList, exchangeRate : string
) : stocksDataList => {
    let totalStocksPrice = "0";
    let listTemp = {...list};

    //루프 돌면서 totalPrice 전체 합 계산
    Object.keys(list).forEach((data) => {
        let totalPriceTemp = list[data].financial.totalPrice

        if(list[data].stockType === stockType.US){
            totalPriceTemp = calStringToNumber(totalPriceTemp, exchangeRate, calculator.MULTIPLICATION);
        }

        totalStocksPrice = calStringToNumber(totalPriceTemp, totalStocksPrice);
        
    });

    Object.keys(list).forEach((data)=>{
        let totalPriceTemp = list[data].financial.totalPrice
        
        if(list[data].stockType === stockType.US){
            totalPriceTemp = calStringToNumber(totalPriceTemp, exchangeRate, calculator.MULTIPLICATION);
        }

        //소수점
        totalPriceTemp = calStringToNumber(totalPriceTemp, 100, calculator.MULTIPLICATION);

        //현 주식 비율 계산
        let pricePercentTemp = calStringToNumber(totalPriceTemp, totalStocksPrice, calculator.DIVISION);

        listTemp[data].stockHistory.totalPricePercent = cutPoint(pricePercentTemp, 2);

        //현재 주식 가격
        let currentPriceTemp = formatComma(Number(delComma(priceList[data].stck_prpr)));

        listTemp[data].stockState.currentPrice = currentPriceTemp;
        listTemp[data].stockHistory.currentPrice = currentPriceTemp;
    });

    return list;
}

function setStorage(data: object){
    localStorage.setItem('usCodeList', JSON.stringify(data));
}

function getStroage(){
    return localStorage.getItem("usCodeList");
}

const transUsCodeFile = (data : usCodeFilesType) => {
    let usCodeList : usCodeListType = {};
    Object.keys(data).forEach((key)=>{
        let lines = data[key].split("\r\n")
        let output : any[][] = [];
    
        output = lines.reduce((prev : any, cur : any)=>{
            prev.push(cur.split("\t"));
            return prev;
        },[])
    
        let header = output[0];
        output = output.slice(1,output.length);
        let temp : {[key: string] : string} = {};

        output.forEach((data)=>{
            let key = "";

            for(let i = data.length-1; i > 0; i--){
                let obj = data[i];

                if(header[i] === "Korea name"){
                    temp[obj] = "";
                    key = obj;
                }
                else if(header[i] === "Symbol"){
                    temp[key] = obj;
                }
            }
        })

        usCodeList[key] = temp;
    });

    return usCodeList;
}

export const getUsCodelist = () => {
    let storageData = getStroage();
    if(storageData){
        return JSON.parse(storageData);
    }

    let usCode = new usCodeFile;
    let data = usCode.getData();
    let usCodeList : usCodeListType = {};

    usCodeList = transUsCodeFile(data);

    setStorage(usCodeList);

    return usCodeList;
}

export const getUsStockInfo = (stockName : string) => {
    let usCodeList = getUsCodelist();
    let result = {
        EXCD : "",
        SYMB : ""
    };

    Object.keys(usCodeList).forEach((key)=>{
        if(usCodeList[key][stockName]){
            result = {
                EXCD : key,
                SYMB : usCodeList[key][stockName]
            };
        }
    })

    return result;
}