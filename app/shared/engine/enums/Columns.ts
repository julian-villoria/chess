export const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export type Column = (typeof COLUMNS)[number];

export function getShiftedColumn(column: Column, shift: number): Column | null {
  const currentIndex = COLUMNS.indexOf(column);

  return COLUMNS[currentIndex + shift] ?? null;
}
