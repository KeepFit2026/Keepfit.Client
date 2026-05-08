import { useState, useMemo, useEffect } from 'react';
import api from '../lib/axios';
import { DailyQuiz } from '../types/Question';

export function useCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dailyQuiz, setDailyQuiz] = useState<DailyQuiz>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();

  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let firstDayIndex = new Date(year, month, 1).getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ num: null, status: 'empty' });
    }

    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = new Date(year, month, d);
      let status = 'locked';

      if (currentDate.toDateString() === today.toDateString()) {
        status = 'today';
      } else if (currentDate < today) {
        status = 'done';
      }

      days.push({ num: d, status });
    }

    return days;
  }, [viewDate]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        setError(undefined);

        const today = new Date();
        const isToday = selectedDate.toDateString() === today.toDateString();

        let response;

        if (isToday) {
          response = await api.get('/api/quizz/today');
        } else {
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const day = String(selectedDate.getDate()).padStart(2, '0');
          const dateString = `${year}-${month}-${day}`;

          response = await api.get('/api/quizz', {
            params: { date: dateString }
          });
        }

        setDailyQuiz(response.data.data);
      } catch (err: any) {
        setDailyQuiz(undefined);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [selectedDate]);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleDayClick = (dayNum: number | null) => {
    if (dayNum !== null) {
      setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum));
    }
  };

  const monthName = viewDate.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric'
  });

  return {
    viewDate,
    calendarData,
    monthName,
    changeMonth,
    dailyQuiz,
    isLoading,
    error,
    selectedDate,
    handleDayClick
  };
}