import { stocksDataList, tradeHistoryData } from "../modules/stock/stockTypes";
import { detailContextFilter, roofFilterUseData, tradeTypeFilter } from "../modules/stock/stock";
import {detailContextData, filterData, initData, tradeTypeData} from './testfiles';
import basicData from "./testfiles/basicData";

describe('데이터 파일 테스트', () => {

    describe('초기 데이터 필터', ()=>{
        let dataList : tradeHistoryData[] = [];

        beforeAll(()=>{
            dataList = initData;
        });
    
        it('거래 유형을 기준으로 데이터 삭제', () => {
            //csv 데이터 리스트 선언
            //거래유형, 상세내용 기준으로 데이터 삭제하는 함수
            //필터가 되었는지 리스트 확인
    
            dataList = tradeTypeFilter(dataList);
    
            expect(dataList).toEqual(tradeTypeData);
        });
    
        it('상세내용을 기준으로 데이터 삭제', () => {
            dataList = detailContextFilter(dataList);
    
            expect(dataList).toEqual(detailContextData);
        });
        
    })

    describe('사이트에서 사용하는 데이터로 변환', () => {
        //csv 데이터 리스트 선언
        let dataList = filterData;
        let result : stocksDataList = {};
        //new Date()시 고정 시간 mock 생성
        const mockDate = new Date('2024.09.05 (12:12:22)');

        beforeEach(()=>{
            jest.useFakeTimers({
                now : mockDate
            });

            jest.setSystemTime(mockDate);
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('basicData 검증',()=>{
            //데이터 돌면서 변환하는 함수
            result = roofFilterUseData(dataList);

            expect(result).toEqual(basicData);
        }) 
    });

    it('모든 csv 데이터 합치기', () => {
        //csv 2개 이상의 파일 데이터 선언
        //데이터 합치기
        //데이터 주식이름을 기준으로 사용하는 데이터 형태로 만들기
        //데이터 구조 검증
    });

});