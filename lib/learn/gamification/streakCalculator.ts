/**
 * Local (not UTC) calendar-day string, e.g. "2026-08-10" — matches the
 * day as the family actually experiences it, not the server's/browser's
 * UTC offset. Used consistently for both storing "last activity date"
 * and computing streak continuity below.
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getPreviousDateString(dateStr: string): string {
  const d = parseLocalDateString(dateStr);
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

/**
 * Deterministic daily-streak calculation, isolated from Firestore and any
 * component. Given the child's current streak count and the last date
 * they completed a mission, decides what the streak becomes after
 * completing a mission "today":
 *
 *   - No previous activity                -> streak starts at 1
 *   - Last activity was today already     -> streak unchanged (completing
 *                                             a 2nd, 3rd... mission on the
 *                                             same day doesn't inflate it)
 *   - Last activity was yesterday         -> streak + 1
 *   - Last activity was 2+ days ago       -> streak resets to 1
 *
 * Never returns a streak below 1 once any activity has happened.
 */
export function calculateNextStreak(
  currentStreakDays: number,
  lastActivityDate: string | null,
  todayDate: string
): { streakDays: number; activityDate: string } {
  if (!lastActivityDate) {
    return { streakDays: 1, activityDate: todayDate };
  }

  if (lastActivityDate === todayDate) {
    return { streakDays: Math.max(currentStreakDays, 1), activityDate: todayDate };
  }

  if (lastActivityDate === getPreviousDateString(todayDate)) {
    return { streakDays: currentStreakDays + 1, activityDate: todayDate };
  }

  return { streakDays: 1, activityDate: todayDate };
}
