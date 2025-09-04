export const formatDate = (dateString) => {
    if (!dateString) return '';

    // Remove duplicate T00:00:00 or fix invalid date formats
    const cleanedDate = dateString.replace(/T00:00:00\.000Z*T00:00:00$/, 'T00:00:00.000Z');

    const date = new Date(cleanedDate);
    if (isNaN(date)) return 'Invalid Date';

    return date.toLocaleString('en-US', {
        weekday: 'short', // "Thu"
        month: 'short', // "Feb"
        day: '2-digit', // "27"
        year: 'numeric', // "2025"
        hour: '2-digit', // "12"
        minute: '2-digit', // "00"
        hour12: true, // "AM/PM"
    });
};
