import { calDiffDate, calStringToNumber, cutPoint, dateToString, formatDate } from '../modules';
import {calculator, filterDetailContext, filterTradeType, stocksData, stocksDataList, stockType, tradeHistoryData} from './stockTypes';

export const tradeTypeFilter = (list : tradeHistoryData[]) : tradeHistoryData[] => {

    let result = list.reduce((
        prev : tradeHistoryData[], cur : tradeHistoryData, i : number, arr : tradeHistoryData[]
    ) : tradeHistoryData[] => {
        let temp = [...prev];

        switch(cur["거래유형"]){
            case filterTradeType["매도"]:
                temp.push(cur);
                break;
            case filterTradeType["매수"]:
                temp.push(cur);
                break;
            case filterTradeType["입금"]:
                temp.push(cur);
                break;

            default:
                break;
        }

        return temp;
    },[]);


    return result;
}

export const detailContextFilter = (list : tradeHistoryData[]) : tradeHistoryData[] => {

    let result = list.reduce((
        prev : tradeHistoryData[], cur : tradeHistoryData, i : number, arr : tradeHistoryData[]
    ) : tradeHistoryData[] => {
        let temp = [...prev];

        switch(cur["상세내용"]){
            case filterDetailContext["외화증권매수"]:
                temp.push(cur);
                break;
            case filterDetailContext["외화증권매도"]:
                temp.push(cur);
                break;
            case filterDetailContext["코스피매수"]:
                temp.push(cur);
                break;
            case filterDetailContext["코스피매도"]:
                temp.push(cur);
                break;
            case filterDetailContext["ETF분배금입금"]:
                temp.push(cur);
                break;
            case filterDetailContext["배당금"]:
                temp.push(cur);
                break;
            case filterDetailContext["KOSDAQ매수"]:
                temp.push(cur);
                break;
            case filterDetailContext["KOSDAQ매도"]:
                temp.push(cur);
                break;

            default:
                break;
        }

        return temp;
    },[]);


    return result;
}

export const roofFilterUseData = (list : tradeHistoryData[]) : stocksDataList => {

    let temp : stocksDataList = {};

    list.forEach((data, i) => {
        const stockName = data["종목명"];

        //종목별 값 초기화
        temp[stockName] = initStockList(temp, stockName);

        //CSV 데이터을 redux에서 사용하게끔 포맷
        temp[stockName] = formatStockData(temp[stockName], data);
    });

    Object.keys(temp).forEach((data)=>{
        //포맷된 데이터 세부 조정
        temp[data] = adjustmentStockData(temp[data]);
    });

    return temp;
}

//포맷된 데이터 세부 조정
function adjustmentStockData(tempData : stocksData){
    let result = {...tempData};

    let flatPriceTemp = "0";
    let buyCount = 0;
    let historyTemp = [...tempData.stockHistory.history];
    let totalReturnTemp = "0";

    //오름차순으로 정렬
    historyTemp.sort((f, s)=>{
        let fTime = formatDate(f.conclusionDate).getTime();
        let sTime = formatDate(s.conclusionDate).getTime();
        if(fTime < sTime) return -1;
        if(fTime > sTime) return 1;
        
        return 0;
    });

    let buyPrice = "0";

    historyTemp.forEach((data,i)=>{
        if(data.tradeType === filterTradeType["매수"]){
            buyPrice = data.unitPrice;

            //평단가 계산을 위해 단가 전부 합치기
            flatPriceTemp = calStringToNumber(buyPrice, flatPriceTemp);
            buyCount += 1;
        }

        if(data.tradeType === filterTradeType["매도"]){
            let buyAmount = calStringToNumber(
                data.quantity, buyPrice, calculator.MULTIPLICATION
            );
            let sellAmount = calStringToNumber(
                data.quantity, data.unitPrice, calculator.MULTIPLICATION
            );

            //history의 손익 계산
            let historyProfitTemp = calStringToNumber(
                sellAmount, buyAmount, calculator.MINUS
            );

            historyTemp[i].historyProfit = historyProfitTemp;

            //총 순수익을 위한 손익 합치기
            totalReturnTemp = calStringToNumber(totalReturnTemp, historyProfitTemp);

            buyPrice = "0";
        }
    });

    //총 순수익을 위한 배당금 합치기
    totalReturnTemp = calStringToNumber(totalReturnTemp, result.financial.totalDividend);

    result.stockHistory.totalReturn = totalReturnTemp;
    result.financial.totalReturn = totalReturnTemp;

    //내림차순으로 정렬
    result.stockHistory.history = historyTemp.sort((f, s)=>{
        let fTime = formatDate(f.conclusionDate).getTime();
        let sTime = formatDate(s.conclusionDate).getTime();
        if(fTime < sTime) return 1;
        if(fTime > sTime) return -1;
        
        return 0;
    });

    //평단가 계산
    result.stockState.flatPrice = cutPoint(
        calStringToNumber(
            flatPriceTemp, buyCount.toString(), calculator.DIVISION
        )
    );

    return result;
}

//CSV 데이터을 redux에서 사용하게끔 포맷
function formatStockData(tempData : stocksData, data : tradeHistoryData){
    let result = {...tempData};

    const {
        financial : {
            totalPrice,
            buyFirstTime,
            totalDividend
        },
        stockState : {
            amount
        }
    } = tempData;

    //히스토리 객체 초기화
    const historyTemp = {
        conclusionAmount : data["거래금액"],
        historyProfit : "-",
        conclusionDate : data["거래일자"],
        unitPrice : data["단가"],
        detailContext : data["상세내용"],
        tradeType : data["거래유형"],
        quantity : data["수량"]
    }

    if(data["거래유형"] === filterTradeType["매수"]){
        //총 투입 금액 (현 종목)
        let totalPriceTemp = calStringToNumber(totalPrice, data["거래금액"]);
        result.financial.totalPrice = totalPriceTemp;
        result.stockState.totalPrice = totalPriceTemp;

        //최초 구매 시기
        //보유기간
        if(formatDate(buyFirstTime) > formatDate(data["거래일자"])){
            result.financial.buyFirstTime = data["거래일자"];
            result.stockState.buyFirstTime = data["거래일자"];
            result.stockState.retentionTime = calDiffDate(data["거래일자"]);
        }

        //매수량
        result.stockState.amount = calStringToNumber(amount,data["수량"]);

        //주식 내역
        result.stockHistory.history.push({
            ...historyTemp,
            historyProfit : "-"
        });
    }
    else if(data["거래유형"] === filterTradeType["매도"]) {
        result.stockState.amount = calStringToNumber(amount,data["수량"],calculator.MINUS);

        //주식 내역
        result.stockHistory.history.push({
            ...historyTemp,
            historyProfit : "0", //다음 다른 타입이 나왔을때 계산
        });
    }
    else if(data["거래유형"] === filterTradeType["입금"]){

        //배당금 일시
        if(
            data["상세내용"] === filterDetailContext.ETF분배금입금 ||
            data["상세내용"] === filterDetailContext.배당금
        ){
            result.financial.totalDividend = calStringToNumber(
                totalDividend, data["거래금액"]
            );
        }

        //주식 내역
        result.stockHistory.history.push({
            ...historyTemp,
            historyProfit : "-"
        });
    }

    return result;
}

function initStockList(temp : stocksDataList, stockKey : string){
    //초기 데이터
    let initData : stocksData = {
        stockName : "",
        stockCode : "",
        stockType : stockType.KR,
        stockHistory : {
            totalPricePercent : "0",
            totalReturn : "0",
            currentPrice : "0",
            history : []
        },
        financial : {
            totalPrice : "0",
            buyFirstTime : dateToString(new Date()),
            installmentSavingRate : "0",
            depositsRate : "0",
            totalReturn : "0",
            totalDividend : "0"
        },
        stockState : {
            totalPrice : "0",
            profit : "0",
            flatPrice : "0",
            retentionTime : "0",
            amount : "0",
            buyFirstTime : dateToString(new Date()),
            currentPrice : "0"
        }
    };

    //새로운 종목일때
    if(!temp[stockKey]){
        temp[stockKey] = initData;
        let stockName = stockKey.split(" ");
        let stockCode = stockName.pop() || "";
        temp[stockKey].stockName = stockName.join(" ");
        temp[stockKey].stockCode = stockCode;
        temp[stockKey].stockType = getStockType(stockCode);
    }

    return temp[stockKey];
}

function getStockType(code : string){
    let type = code.slice(0,2);
    switch (type) {
        case stockType.US:
            return stockType.US;
        default:
            return stockType.KR;
    }
}