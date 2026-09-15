import { SymbolHeader } from "@/components/symbol/SymbolHeader";
import { SymbolChart } from "@/components/symbol/SymbolChart";
import { SymbolAnalysis } from "@/components/symbol/SymbolAnalysis";
import { SymbolProfile } from "@/components/symbol/SymbolProfile";
import { SymbolFinancials } from "@/components/symbol/SymbolFinancials";
import { NewsFeed } from "@/components/NewsFeed";

export default async function StockPage({ params }: PageProps<"/stock/[symbol]">) {
  const { symbol } = await params;
  const ticker = decodeURIComponent(symbol).toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">
      <SymbolHeader symbol={ticker} />

      <main className="w-full flex-1 py-3 space-y-3">
        <SymbolChart symbol={ticker} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
          <SymbolAnalysis symbol={ticker} />
          <SymbolProfile symbol={ticker} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
          <SymbolFinancials symbol={ticker} />
          <NewsFeed symbol={ticker} height={462} />
        </div>
      </main>
    </div>
  );
}
