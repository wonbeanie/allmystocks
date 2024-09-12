import { calRateToStockData } from "../modules/interestrate/interestRate";
import basicInfo from "./testfiles/basicInfo";
import interestRateToBasicData from "./testfiles/interestRateToBasicData";
import priceToBasicData from "./testfiles/priceToBasicData";

describe('예적금 데이터 변환 테스트', () => {

    it('사이트에서 사용하는 데이터', ()=>{
        let {depositsRate, installmentSavingRate} = basicInfo;
        let result = calRateToStockData(priceToBasicData, {
            depositsRate,
            installmentSavingRate
        });
        expect(result).toEqual(interestRateToBasicData);
    });

});