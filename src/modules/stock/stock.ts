import {filterDetailContext, filterTradeType, tradeHistoryData} from './stockTypes';

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