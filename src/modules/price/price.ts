import { calStringToNumber, cutPoint, delComma, formatComma } from '../modules';
import { calculator, stocksData, stocksDataList, stockType } from '../stock/stockTypes';
import {priceList, priceResData} from './priceTypes';

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
        // list[data] = calTotalPricePercent(list[data], totalStocksPrice);
        let totalPriceTemp = list[data].financial.totalPrice
        
        if(list[data].stockType === stockType.US){
            totalPriceTemp = calStringToNumber(totalPriceTemp, exchangeRate, calculator.MULTIPLICATION);
        }

        totalPriceTemp = calStringToNumber(totalPriceTemp, 100, calculator.MULTIPLICATION);
        
        let pricePercentTemp = calStringToNumber(totalPriceTemp, totalStocksPrice, calculator.DIVISION);

        listTemp[data].stockHistory.totalPricePercent = cutPoint(pricePercentTemp, 2);

        let currentPriceTemp = formatComma(Number(delComma(priceList[data].stck_prpr)));

        listTemp[data].stockState.currentPrice = currentPriceTemp;
        listTemp[data].stockHistory.currentPrice = currentPriceTemp;
    });

    return list;
}

function calTotalPricePercent(data : stocksData, totalStocksPrice : string) {
    data.stockHistory.totalPricePercent = calStringToNumber(
        data.financial.totalPrice, totalStocksPrice, calculator.DIVISION);

    return data;
}