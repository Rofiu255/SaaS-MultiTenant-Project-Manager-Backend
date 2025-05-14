// utils/dateUtils.ts
import { format, formatDistanceToNowStrict, isBefore, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

export const formatDate = (date: Date | string): string =>
  format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

export const timeAgo = (date: Date | string): string =>
  formatDistanceToNowStrict(new Date(date), { addSuffix: true });

export const isOverdue = (dueDate: Date | string): boolean =>
  isBefore(new Date(dueDate), new Date());

export const getTimeDifference = (start: Date | string, end: Date | string): {
  minutes: number;
  hours: number;
  days: number;
} => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return {
    minutes: differenceInMinutes(endDate, startDate),
    hours: differenceInHours(endDate, startDate),
    days: differenceInDays(endDate, startDate),
  };
};

export const getDayName = (date: Date | string): string =>
  format(new Date(date), 'EEEE'); // e.g. Monday, Tuesday
