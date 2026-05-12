import { useState, useMemo, useEffect } from 'react';
import api from '../lib/axios';
import { DailyQuiz } from '../types/Question';

export function useCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dailyQuiz, setDailyQuiz] = useState<DailyQuiz>();
  const [finishedIds, setFinishedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyStatus = async () => {
      try {
        const res = await api.get('/api/quizz/check', {
          params: { month: viewDate.getMonth(), year: viewDate.getFullYear() }
        });
        setFinishedIds(res.data.finished_ids || []);
      } catch (err) { console.error(err); }
    };
    fetchMonthlyStatus();
  }, [viewDate]);

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        setIsLoading(true);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const res = await api.get('/api/quizz', { params: { date: dateStr } });
        setDailyQuiz(res.data.data);
      } catch { setDailyQuiz(undefined); }
      finally { setIsLoading(false); }
    };
    fetchQuizz();
  }, [selectedDate]);

  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay() - 1;
    if (firstDay === -1) firstDay = 6;

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ num: null, status: 'empty' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= daysInMonth; d++) {
      const curr = new Date(year, month, d);
      curr.setHours(0, 0, 0, 0);

      const isToday = curr.getTime() === today.getTime();
      const isPast = curr < today;
      const isFuture = curr > today;

      let status = 'available';

      if (isFuture) {
        status = 'locked';
      } else {
        const isFinished = dailyQuiz && d === new Date(selectedDate).getDate() && finishedIds.includes(dailyQuiz.id);

        if (isFinished) status = 'done';
        else if (isToday) status = 'today';
        else if (isPast) status = 'missed';
      }

      days.push({ num: d, status });
    }
    return days;
  }, [viewDate, finishedIds, dailyQuiz, selectedDate]);

  return {
    viewDate, calendarData,
    monthName: viewDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    changeMonth: (o: number) => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + o, 1)),
    dailyQuiz, isLoading, selectedDate,
    handleDayClick: (d: number) => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), d)),
    finishedIds
  };
}