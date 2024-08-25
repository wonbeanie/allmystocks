import test from "../modules/test";

describe('js test', () => {
    it('이건 테스트 타이틀 메시지1', () => {
        expect(3 + 4).toBe(7);
    });

    it('이건 테스트 타이틀 메시지2', () => {
        const name = 'yuds';
        expect(name).toBe('yuds');
    });

    it('이건 테스트 타이틀 메시지2', () => {
        expect(test(1,2)).toBe(3);
    });
});