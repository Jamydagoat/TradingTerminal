import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMarketNews, getCompanyNews, hasFinnhubKey } from "@/lib/finnhub";
import { marketNews as mockNews } from "@/lib/mockData";
import type { NewsItem } from "@/lib/types";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockNews });
  }

  try {
    const raw = symbol ? await getCompanyNews(symbol) : await getMarketNews();
    if (!raw || raw.length === 0) {
      return NextResponse.json({ live: false, data: mockNews });
    }

    const data: NewsItem[] = raw
      .filter((n) => n.headline && n.url)
      .slice(0, 20)
      .map((n) => ({
        id: String(n.id ?? n.url),
        headline: n.headline!,
        url: n.url!,
        source: n.source ?? "",
        datetime: n.datetime ?? 0,
        related: n.related ?? "",
      }));

    if (data.length === 0) {
      return NextResponse.json({ live: false, data: mockNews });
    }
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockNews });
  }
}
