import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const formatDate = (date: Date | string, format: string = 'YYYY/MM/DD'): string => {
    try {
        return dayjs(date).format(format);
    }
    catch {
        return '';
    }
}

export const addDays = (date: Date, days: number): Date => {
    try {
        return dayjs().add(days, 'day').toDate();
    }
    catch {
        return date;
    }
}

export const dateIsBefore = (firstDate: Date, secondDate: Date): boolean => {
    try {
        return dayjs(firstDate).isBefore(secondDate);
    }
    catch {
        return false;
    }
}
