import { calDiffDate, calStringToNumber, dateToString, formatDate } from '../modules';
import {calculator, filterDetailContext, filterTradeType, stocksData, stocksDataList, tradeHistoryData} from './stockTypes';

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

    list.forEach((data, i)=>{
        const stockName = data["종목명"];

        temp[stockName] = initStockList(temp, stockName);

        temp[stockName] = formatStockData(temp[stockName], data);
    });

    // Object.keys(temp).forEach((data)=>{
    //     console.log(temp[data].stockState.buyFirstTime);
    // });

    Object.keys(temp).forEach((data)=>{
        temp[data] = adjustmentStockData(temp[data], data);
    });

    return temp;
}

function adjustmentStockData(tempData : any, data : any){
    let result = {...tempData};

    let flatPriceTemp = "0";
    let historyTemp = [...tempData.stockHistory.history];

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
        }

        if(data.tradeType === filterTradeType["매도"]){
            let buyAmount = calStringToNumber(
                data.quantity, buyPrice, calculator.MULTIPLICATION
            );
            let sellAmount = calStringToNumber(
                data.quantity, data.unitPrice, calculator.MULTIPLICATION
            );

            //history의 손익 계산
            historyTemp[i].historyProfit = calStringToNumber(
                buyAmount, sellAmount, calculator.MINUS
            );
        }

        //평단가 계산을 위해 단가 전부 합치기
        flatPriceTemp = calStringToNumber(data.unitPrice, flatPriceTemp);
    });

    result.stockHistory.history = historyTemp;

    //평단가 계산
    result.stockState.flatPrice = calStringToNumber(
        flatPriceTemp, result.stockState.amount, calculator.DIVISION
    );

    return result;
}

function formatStockData(tempData : any, data : any){
    let result = {...tempData};

    const {
        financial : {
            totalPrice,
            buyFirstTime,
            totalDividend
        },
        stockState : {
            amount,
            retentionTime
        },
        stockHistory : {
            history
        }
    } = tempData;

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
        //총 투입 금액 (주식)
        result.financial.totalPrice = calStringToNumber(totalPrice, data["거래금액"]);

        //최초 구매 시기
        //보유기간
        if(formatDate(buyFirstTime) > formatDate(data["거래일자"])){
            result.financial.buyFirstTime = data["거래일자"];
            result.stockState.buyFirstTime = data["거래일자"];
            result.stockState.retentionTime = calDiffDate(data["거래일자"]);
        }

        //매수량r
        result.stockState.amount = calStringToNumber(amount,data["수량"]);

        //주식 내역
        result.stockHistory.history.push({
            ...historyTemp,
            historyProfit : "-"
        });
    }
    else if(data["거래유형"] === filterTradeType["매도"]) {
        //주식 내역
        result.stockHistory.history.push({
            ...historyTemp,
            historyProfit : "0", //다음 다른 타입이 나왔을때 계산
        });
    }
    else if(data["거래유형"] === filterTradeType["입금"]){
        if(
            data["상세내용"] === filterDetailContext.ETF분배금입금 ||
            data["상세내용"] === filterDetailContext.배당금
        ){
            result.financial.totalDividend += calStringToNumber(
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

function initStockList(temp : any, stockName : string){
    let initData : stocksData = {
        stockName : "",
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

    if(!temp[stockName]){
        temp[stockName] = initData;
        temp[stockName].stockName = stockName;
    }

    return temp[stockName];
}

//totalReturn
//historyProfit
function calHistoryProfit(history : History[]){

    history.forEach((data)=>{
        // if(data.)


        // 화면 수정해야됨
        //버그 수정
        //먼저 정상적으로 출력되어야 할 데이터 만들고 다시 작업 시작
    })
}

//전부 분리되어있어
//json안에 속성명을 종목으로해서 묶은뒤에
//종목별로 계산시작