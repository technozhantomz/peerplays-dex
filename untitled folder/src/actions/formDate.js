export const formDate = (date, pattern = ['date', 'month', 'year']) => {
    const newDate = String(new Date(date)).split(' ');
    const dateObj = {
        date: newDate[2],
        month: newDate[1],
        year: newDate[3],
        time: newDate[4]
    };
    return pattern.map(el => dateObj[el]).join(' ');
};

export const formatDate = (date) => new Date(date).toISOString().split('.')[0];