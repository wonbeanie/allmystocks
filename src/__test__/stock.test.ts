import { filterData, initData } from "./testData";

describe('데이터 파일 테스트', () => {

    describe('초기 데이터 필터', ()=>{
        let dataList = [];

        beforeAll(()=>{
            dataList = initData;
        });
    
        it('거래 유형을 기준으로 데이터 삭제', () => {
            //csv 데이터 리스트 선언
            //거래유형, 상세내용 기준으로 데이터 삭제하는 함수
            //필터가 되었는지 리스트 확인
    
            //임시
            const tradeTypeFilter = jest.fn(()=>{
                return [];
            })
    
            dataList = tradeTypeFilter();
    
            expect(dataList).toEqual([]);
        });
    
        it('상세내용을 기준으로 데이터 삭제', () => {
            //임시
            const detailContextFilter = jest.fn(()=>{
                return [];
            })
    
            dataList = detailContextFilter();
    
            expect(dataList).toEqual([]);
        });
        
    })

    describe('사이트에서 사용하는 데이터로 변환', () => {
        //csv 데이터 리스트 선언
        let dataList = filterData;
        let result = {};


        const roofFilterUseData = jest.fn((dataList : any[])=>{
            return {};
        })

        //데이터 돌면서 변환하는 함수
        result = roofFilterUseData(dataList);

        //사용하는 데이터로 변환데이터가 정상적으로 변환됬는지 검증
        it('평단가 검증',()=>{
            //루프돌면서 단가 값 저장하고 나중에 매수량으로 평균
        });

        it('평균 배당금 검증',()=>{
            //루프돌면서 배당금 값 저장하고 나중에 평균 구하면됨
        });
    });

    it('모든 csv 데이터 합치기', () => {
        //csv 2개 이상의 파일 데이터 선언
        //데이터 합치기
        //데이터 주식이름을 기준으로 사용하는 데이터 형태로 만들기
        //데이터 구조 검증
    });

});