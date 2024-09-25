import { calPriceToStockData, getUsStockInfo, transUsCodeFile, transUsStockInfo } from "../modules/price/price";
import { usCodeListType } from "../modules/price/priceTypes";
import { amsCode, nasCode, nysCode } from "../modules/price/uscodefile/usCodeFiles";
import { stocksData } from "../modules/stock/stockTypes";
import test from "../modules/test";
import basicData from "./testfiles/basicData";
import basicInfo from "./testfiles/basicInfo";
import getPrice from "./testfiles/getPrice";
import price from "./testfiles/getPrice";
import priceToBasicData from "./testfiles/priceToBasicData";

describe('주식 가격 api 데이터 변환 데스트', () => {

    it('사이트에서 사용하는 데이터', () => {
        let priceList = getPrice();
        let basicDataTemp = {...basicData};
        let exchangeRate = basicInfo.exchangeUSRate;

        basicDataTemp = calPriceToStockData(basicDataTemp, priceList, exchangeRate);
        
        expect(basicDataTemp).toEqual(priceToBasicData);
    });

    it('미국 주식 거래소별 코드 가져오기', () => {
        let data = {
            "AMS" : amsCode,
            "NAS" : nasCode,
            "NYS" : nysCode
        }
        let usCodeList : usCodeListType = {};

        usCodeList = transUsCodeFile(data);

        let result = transUsStockInfo("iShares Expanded Tech Sector ETF", usCodeList);        
        
        expect(result).toEqual({
            EXCD : "AMS",
            SYMB : "IGM",
        });
    });
});