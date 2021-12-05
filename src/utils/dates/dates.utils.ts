import { DatePatternsEnum } from '../../enums/date-patterns.enum';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru/index.js';
import { utcToZonedTime } from 'date-fns-tz';

const getToday = (pattern: DatePatternsEnum = DatePatternsEnum.ApiDatePattern): string => {
    return format(new Date(), pattern, {
        locale: ruLocale,
    });
};

const getMoscowTime = (date: string | null): string => {
    if (!date) {
        return '';
    }

    const timeZone = 'Europe/Moscow';
    const zonedDate = utcToZonedTime(date, timeZone);
    const time = new Date(zonedDate).toTimeString();
    const cutTime = time.split(':').slice(0, 2).join(':');
    return `${cutTime} МСК`;
};

export { getToday, getMoscowTime };