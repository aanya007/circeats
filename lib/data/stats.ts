export interface MiniStat {
  value: string;
  label: string;
}

export const heroStats: MiniStat[] = [
  { value: "755,000t", label: "food wasted in SG yearly" },
  { value: "47%", label: "of food imports = waste" },
  { value: "2035", label: "landfill capacity reached" },
];

export interface BigStat {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const pinnedStats: BigStat[] = [
  { target: 167000, suffix: "t", label: "fruits & vegetables lost yearly" },
  { target: 5901, prefix: "=", label: "twenty-foot shipping containers" },
  { target: 342, prefix: "$", suffix: "M", label: "household food waste cost / yr" },
];

export const pinnedStatsSource =
  "Source: NEA Singapore, Singapore Environment Council, 2023–2024";
