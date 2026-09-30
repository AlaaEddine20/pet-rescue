import { format, labels } from "@/locales";

export function formatRelativeDate(isoDate: string): string {
  const diffDays = Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return labels.reportListItem.relative.today;
  if (diffDays === 1) return labels.reportListItem.relative.yesterday;
  return format(labels.reportListItem.relative.daysAgo, { days: diffDays });
}
