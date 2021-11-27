import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru/index.js';

const getToday = (): string => {
    return format(new Date(), 'yyyy-MM-dd', {
        locale: ruLocale,
    });
};

export { getToday };