export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Row = (typeof ROWS)[number];

export function getShiftedRow(row: Row, shift: number) {
  const currentIndex = ROWS.indexOf(row);

  return ROWS[currentIndex + shift] ?? null;
}
