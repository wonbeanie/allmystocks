import { calStringToNumber, cutPoint, formatDate, historySort } from "../modules";
import { sortType } from "../modulesType";
import { calculator, filterTradeType, stocksDataList, stockType } from "../stock/stockTypes"
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
        let historyDateTemp : Date;
    
        //몇년차인지 계산
        let historyYaer = new Date(stockData.stockState.buyFirstTime);
        let diffYaer = calDiffYear(historyYaer);

        //오름차순으로 정렬
        history = history.sort(historySort());

        history.forEach((data, i)=>{
            if(data.tradeType === filterTradeType["입금"]){
                return;
            }
            
            let date = new Date(data.conclusionDate);

            //최초 구매 시간과 현재 시간이 1년차이 이상일때
            if(i > 0 && diffYaer > 1 && historyDateTemp){
                //이전 내역의 시간과 현재 내역의 시간과의 차이 계산
                let historyDiffYaer = calDiffYear(historyDateTemp, date);

                //차이가 1년 이상일때
                if(historyDiffYaer >= 1){
                    //예금 1년 계산
                    let yearDeposits = calDeposits(totalAmount, depositsRate);
                    
                    //depositsTemp에 합산
                    depositsTemp = calStringToNumber(depositsTemp, yearDeposits);

                    //2년 이상이라면 이자 n배
                    depositsTemp = calStringToNumber(
                        depositsTemp, historyDiffYaer, calculator.MULTIPLICATION
                    );

                    //적금 1년 계산
                    let yaerInstallmentSaving = calInstallmentSaving(totalAmount, installmentSavingRate);

                    //installmentSavingTemp에 합산
                    installmentSavingTemp = calStringToNumber(installmentSavingTemp,yaerInstallmentSaving);

                    //2년 이상이라면 이자 n배
                    installmentSavingTemp = calStringToNumber(
                        installmentSavingTemp, historyDiffYaer, calculator.MULTIPLICATION
                    );
                }
            }

            //예적금 계산을 위한 쌓인 투입금액 계산
            if(data.tradeType === filterTradeType["매수"]){
                totalAmount = calStringToNumber(totalAmount, data.conclusionAmount);
            }
            else if(data.tradeType === filterTradeType["매도"]) {
                totalAmount = calStringToNumber(totalAmount, data.conclusionAmount, calculator.MINUS);
            }

            //이전 내역의 시간 저장
            historyDateTemp = date;
        });


        //내림차순으로 정렬
        history = history.sort(historySort(sortType.desc));

        //최종 예금 계산
        depositsTemp = calStringToNumber(
            depositsTemp, calDeposits(totalAmount, depositsRate)
        );

        //최종 적금 계산
        installmentSavingTemp = calStringToNumber(
            installmentSavingTemp, calInstallmentSaving(totalAmount, installmentSavingRate)
        );

        tempData[key].financial.interestDeposits = depositsTemp;
        tempData[key].financial.interestInstallmentSaving = installmentSavingTemp;
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
function calInstallmentSaving(amount : string, installmentSavingRate : string){
    //이자 총합
    let totalInterest = "0";

    let rate = calStringToNumber(installmentSavingRate,100, calculator.DIVISION, false);

    //js 소수점 문제로 인해
    amount = calStringToNumber(amount, 100, calculator.MULTIPLICATION);

    //총 투입 금액에서 1년(12개월)을 나눠서 달마다의 투입 금액 계산
    let monthAmount = calStringToNumber(amount, 12, calculator.DIVISION);

    //12개월 적금 이자 계산
    for(let i = 12; i > 0 ; i--){
        let result = calStringToNumber(monthAmount, rate, calculator.MULTIPLICATION);

        let temp = calStringToNumber(i, 12, calculator.DIVISION);

        result = calStringToNumber(result, temp, calculator.MULTIPLICATION);

        totalInterest = calStringToNumber(totalInterest, result);
    }

    //소수점 문제 복구
    totalInterest = calStringToNumber(totalInterest, 100, calculator.DIVISION, false);

    return cutPoint(totalInterest, 2);
}

function calDiffYear(start:Date, end:Date = new Date()){
    let diffDate = Math.ceil(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return Math.floor(diffDate / 365);;
}