/** Local business hours: 9:00–17:00 in 30-minute steps (inclusive of 17:00). */
export const TIME_SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 30] as const) {
      if (h === 17 && m === 30) break;
      out.push(`${String(h).padStart(2, "0")}:${m === 0 ? "00" : "30"}`);
    }
  }
  return out;
})();
