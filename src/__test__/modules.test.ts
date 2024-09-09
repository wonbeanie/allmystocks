import { calDiffDate, calStringToNumber, dateToString, formatDate } from "../modules/modules";
import { calculator } from "../modules/stock/stockTypes";

describe("모듈 테스트",()=>{
    //new Date()시 고정 시간 mock 생성
    const mockDate = new Date('2024.08.05 (12:12:22)');

    beforeEach(()=>{
        jest.useFakeTimers({
            now : mockDate
        });

        jest.setSystemTime(mockDate);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("날짜 차이 계산 함수",()=>{

        it("년월 계산",()=>{
            let data = calDiffDate('2023.07.07 (12:12:22)', '2024.08.08 (12:12:22)');

            expect(data).toBe('1년 1개월');
        });
        
        it("일 계산",()=>{
            let data = calDiffDate('2023.07.08 (12:12:22)', '2023.07.30 (12:12:22)');

            expect(data).toBe('22일');
        });

        it("딱 1년",()=>{
            let data = calDiffDate('2023.07.08 (12:12:22)', '2024.07.08 (12:12:22)');

            expect(data).toBe('1년');
        })

        it("딱 31일",()=>{
            let data = calDiffDate('2023.07.08 (12:12:22)', '2023.08.09 (12:12:22)');

            expect(data).toBe('1개월');
        });

        it("현재",()=>{
            let data = calDiffDate('2023.07.08 (12:12:22)', '2023.07.08 (12:12:23)');

            expect(data).toBe('1일');
        });

        it("기준 날짜부터 현재까지",()=>{
            let data = calDiffDate('2023.06.03 (14:12:36)');

            expect(data).toBe('1년 2개월');
        });
    });

    describe("문자열로 된 숫자 계산기",()=>{
        it("더하기",()=>{
            let data = calStringToNumber('5000', '12500');

            expect(data).toBe('17,500');
        });

        it("곱하기",()=>{
            let data = calStringToNumber('250', '40', calculator.MULTIPLICATION);

            expect(data).toBe('10,000');
        });

        it("나누기",()=>{
            let data = calStringToNumber('224882', '2', calculator.DIVISION);

            expect(data).toBe('112,441');
        });

        it("빼기",()=>{
            let data = calStringToNumber('55448', '5442', calculator.MINUS);

            expect(data).toBe('50,006');
        });

        it("콤마 포함 숫자",()=>{
            let data = calStringToNumber('15,000', '2,500', calculator.MINUS);

            expect(data).toBe('12,500');
        });
    });

    describe("csv 날짜 데이터를 Date 객체로 변환하는 함수",()=>{
        it("csv 데이터 변환",()=>{
            let data = formatDate('2023.07.08 (12:12:22)');

            expect(data).toEqual(new Date("2023.07.08 12:12:22"));
        });
        it("오늘 날짜의 Date 객체 반환",()=>{
            let data = formatDate();

            expect(data).toEqual(new Date());
        });
    });

    describe("csv 날짜 데이터를 Date 객체로 변환하는 함수",()=>{
        it("csv 데이터 변환",()=>{
            let data = dateToString(new Date("2023.07.08 12:12:12"));

            expect(data).toBe("2023.07.08 12:12:12");
        });
    });
});