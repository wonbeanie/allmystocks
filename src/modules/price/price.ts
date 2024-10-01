import { calStringToNumber, cutPoint, delComma, formatComma } from '../modules';
import { calculator, stocksData, stocksDataList, stockType } from '../stock/stockTypes';
import {priceList, priceResData, usCodeFilesType, usCodeListType} from './priceTypes';
import { amsCode, nasCode, nysCode } from './uscodefile/usCodeFiles';

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

//파일로 되어 있는 usCodeList 로컬에 저장
//파일이 크기때문에 변환작업을 반복하지 않도록
function setStorage(data: object){
    localStorage.setItem('usCodeList', JSON.stringify(data));
}

//usCodeList 가져오기
function getStorage(){
    return localStorage.getItem("usCodeList");
}

//파일에서 json으로 변환 함수
export const transUsCodeFile = (data : usCodeFilesType) => {
    let usCodeList : usCodeListType = {};

    Object.keys(data).forEach((key)=>{
        //줄마다 계산하기 위해
        let lines = data[key].split("\r\n")
        let output : any[][] = [];
    
        //txt(탭으로 분리)로 되어있기 때문에 \t을 기준으로 arr생성
        output = lines.reduce((prev : any, cur : any)=>{
            prev.push(cur.split("\t"));
            return prev;
        },[])
    
        //첫 배열은 key값이기 때문에 분리
        let header = output[0];
        output = output.slice(1,output.length);

        //데이터가 많기 때문에 key : value 형식인 json으로 저장
        let temp : {[key: string] : string} = {};

        output.forEach((data)=>{
            let key = "";

            //필요한 데이터는 한국어 이름, api요청을 위한 심볼값
            //하지만 파일 구조상 심볼이 먼저 나오고 한국어 이름이 나오기 때문에
            //역으로 계산한다면 훨씬 단축되기 때문에 역으로 계산
            for(let i = data.length-1; i > 0; i--){
                let obj = data[i];

                if(header[i] === "Korea name"){
                    obj = obj.replace(/ /gi, "_");

                    //대소문자 구분이 되지 않기 위해 전부 대문자로 변환
                    obj = obj.toUpperCase();
                    temp[obj] = "";
                    key = obj;
                }
                else if(header[i] === "Symbol"){
                    temp[key] = obj;
                    continue;
                }
            }
        })

        usCodeList[key] = temp;
    });

    return usCodeList;
}

//파일에서 json으로 변환한 데이터 가져오는 함수
export const getUsCodelist = () => {
    //먼저 변환한 데이터가 있는지 확인
    let storageData = getStorage();
    if(storageData){
        return JSON.parse(storageData);
    }

    //각 AMS, NAS, NYS 거래소 데이터 가져오기
    let data = {
        "AMS" : amsCode,
        "NAS" : nasCode,
        "NYS" : nysCode
    }
    let usCodeList : usCodeListType = {};

    //변환
    usCodeList = transUsCodeFile(data);

    //storage 저장
    setStorage(usCodeList);

    //반환
    return usCodeList;
}

//특정 주식의 거래소명과 심볼값 가져오는 함수
export const transUsStockInfo = (stockName : string, usCodeList : any) => {
    let result = {
        EXCD : "",
        SYMB : ""
    };

    //대문자로 변환
    stockName = stockName.toUpperCase();

    stockName = stockName.replace(/ /gi, "_")

    //특정 주식 서치
    Object.keys(usCodeList).some((key)=>{
        if(usCodeList[key][stockName]){
            result = {
                EXCD : key,
                SYMB : usCodeList[key][stockName]
            };

            //서치 완료시 종료
            return true;
        }
    })

    return result;
}

//주식 이름 입력시 거래소명, 심볼값 반환 함수
export const getUsStockInfo = (stockName : string) => {
    let usCodeList = getUsCodelist();

    let result = transUsStockInfo(stockName, usCodeList);

    return result;
}