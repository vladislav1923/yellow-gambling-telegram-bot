import { getMoscowTime } from './dates.utils';

describe('Dates utils', () => {
    it('should return moscow time by date', () => {
        const testMap = new Map<string | null, string>()
            .set(null, '')
            .set('2021-12-05T17:00:00+03:00', '17:00 МСК')
            .set('2021-12-05T14:00:00+00:00', '17:00 МСК')
            .set('2021-12-05T23:00:00+00:00', '02:00 МСК')
            .set('2021-12-05T11:15:20+02:00', '12:15 МСК');

        for (const [date, expectedTime] of testMap) {
            const moscowTime = getMoscowTime(date);

            expect(moscowTime).toBe(expectedTime);
        }
    });
});
