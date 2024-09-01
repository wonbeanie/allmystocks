import {filterTradeType, tradeHistoryData} from './stockTypes';

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