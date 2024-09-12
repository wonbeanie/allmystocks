import { calStringToNumber, cutPoint, formatDate, historySort } from "../modules";
import { sortType } from "../modulesType";
import { calculator, filterTradeType, stocksDataList } from "../stock/stockTypes"
import { rates } from "./interestRateTypes";

export const calRateToStockData = (list : stocksDataList, {depositsRate, installmentSavingRate} : rates) => {
    let result = 0;
    let tempData = {...list};

    Object.keys(list).forEach((key)=>{
        let stockData = list[key];
        let history = stockData.stockHistory.history;

        let installmentSavingTemp = "0";
        let depositsTemp = "0";

        let totalAmount = "0";
        let nextYaerDate : Date;
        let historyDateTemp : Date;
    
        //몇년차인지 계산
        let historyYaer = new Date(stockData.stockState.buyFirstTime);
        let diffYaer = calDiffYear(historyYaer);

        //오름차순으로 정렬
        // history = history.sort((f, s)=>{
        //     let fTime = formatDate(f.conclusionDate).getTime();
        //     let sTime = formatDate(s.conclusionDate).getTime();
        //     if(fTime < sTime) return -1;
        //     if(fTime > sTime) return 1;
            
        //     return 0;
        // });
        history = history.sort(historySort());

        history.forEach((data, i)=>{
            if(data.tradeType === filterTradeType["입금"]){
                return;
            }
            
            let date = new Date(data.conclusionDate);

            
            if(i > 0 && diffYaer > 1 && historyDateTemp){
                let historyDiffYaer = calDiffYear(historyDateTemp, date);
                if(historyDiffYaer >= 1){
                    //예적금 계산 년도 차이만큼
                    depositsTemp = calStringToNumber(depositsTemp, calDeposits(totalAmount, depositsRate));
                }
            }

            if(data.tradeType === filterTradeType["매수"]){
                totalAmount = calStringToNumber(totalAmount, data.conclusionAmount);
            }
            else if(data.tradeType === filterTradeType["매도"]) {
                totalAmount = calStringToNumber(totalAmount, data.conclusionAmount, calculator.MINUS);
            }

            historyDateTemp = date;
        });

        // history = history.sort((f, s)=>{
        //     let fTime = formatDate(f.conclusionDate).getTime();
        //     let sTime = formatDate(s.conclusionDate).getTime();
        //     if(fTime < sTime) return 1;
        //     if(fTime > sTime) return -1;
            
        //     return 0;
        // });
        history = history.sort(historySort(sortType.desc));

        depositsTemp = calStringToNumber(
            depositsTemp, calDeposits(totalAmount, depositsRate)
        );

        tempData[key].financial.interestDeposits = depositsTemp;

        // installmentSavingTemp = calInstallmentSaving(totalAmount, installmentSavingRate);
    
        // console.log(totalAmount);
        
        //히스토리 돌면서, 매수 = 더하고, 매도 = 빼고 총 값을 구한다
    
        //2년차 이상이면
        //최초 매수를 기준으로 1년단위로 예금, 적금 계산하고 temp에 저장
        //그 뒤 1년을 계산하는 방식으로 반복
        //temp 전부 합산
    })

    return tempData;
}

//예금
function calDeposits(amount : string, depositsRate : string){
    let rate = calStringToNumber(depositsRate,100, calculator.DIVISION, false);
    let result = calStringToNumber(amount, rate, calculator.MULTIPLICATION);

    return cutPoint(result, 2);
}

//적금
function calInstallmentSaving(){
    return "0";
}

function calDiffYear(start:Date, end:Date = new Date()){
    let diffDate = Math.ceil(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return Math.floor(diffDate / 365);;
}