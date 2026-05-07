import { NextResponse } from "next/server";

export const revalidate = 3600;

interface RawContrib {
  date: string;
  count: number;
  level: number;
}

function buildGrid(contributions: RawContrib[]): number[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from the Sunday of the week that is 52 weeks before the current week
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay());
  const startDate = new Date(startOfCurrentWeek);
  startDate.setDate(startOfCurrentWeek.getDate() - 52 * 7);

  const grid: number[][] = Array.from({ length: 53 }, () => Array(7).fill(0));

  for (const c of contributions) {
    // Parse as local date to avoid UTC offset shifting the day
    const [y, m, d] = c.date.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const diffDays = Math.round((date.getTime() - startDate.getTime()) / 86_400_000);
    if (diffDays < 0 || diffDays >= 53 * 7) continue;
    grid[Math.floor(diffDays / 7)][diffDays % 7] = c.level;
  }

  return grid;
}

export async function GET() {
  try {
    // No year filter → returns all-time data with full contributions array
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/ltin0",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const contributions: RawContrib[] = data.contributions ?? [];
    const grid = buildGrid(contributions);
    // Sum all-time totals from the `total` map (year → count)
    const total: number = data.total
      ? Object.values(data.total as Record<string, number>).reduce((a, b) => a + b, 0)
      : contributions.reduce((a: number, c: RawContrib) => a + c.count, 0);
    return NextResponse.json({ grid, total });
  } catch {
    return NextResponse.json({ grid: null, total: null }, { status: 500 });
  }
}
