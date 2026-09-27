export function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

export function timeAgo(hoursAgo: number) {
  if (hoursAgo < 1) {
    const minutes = Math.max(1, Math.round(hoursAgo * 60));
    return `${minutes} ${plural(minutes, ['минуту', 'минуты', 'минут'])} назад`;
  }
  if (hoursAgo < 24) {
    const hours = Math.round(hoursAgo);
    return `${hours} ${plural(hours, ['час', 'часа', 'часов'])} назад`;
  }
  const days = Math.round(hoursAgo / 24);
  if (days === 1) return 'вчера';
  return `${days} ${plural(days, ['день', 'дня', 'дней'])} назад`;
}

export function compactNumber(n: number) {
  if (n < 1000) return String(n);
  const thousands = n / 1000;
  return `${thousands.toFixed(thousands < 10 ? 1 : 0).replace('.', ',')} тыс.`;
}
