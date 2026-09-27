export function plural(n: number, one: string, many: string) {
  return n === 1 ? one : many;
}

export function timeAgo(hoursAgo: number) {
  if (hoursAgo < 1) {
    const minutes = Math.max(1, Math.round(hoursAgo * 60));
    return `${minutes} ${plural(minutes, 'minute', 'minutes')} ago`;
  }
  if (hoursAgo < 24) {
    const hours = Math.round(hoursAgo);
    return `${hours} ${plural(hours, 'hour', 'hours')} ago`;
  }
  const days = Math.round(hoursAgo / 24);
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export function compactNumber(n: number) {
  if (n < 1000) return String(n);
  const thousands = n / 1000;
  return `${thousands.toFixed(thousands < 10 ? 1 : 0)}K`;
}
