import { TickerTape } from "@/components/TickerTape";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TickerTape />
      <Dashboard />
      <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted">
        Data may be delayed or approximate. Not investment advice.
      </footer>
    </div>
  );
}
