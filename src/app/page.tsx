import { TickerTape } from "@/components/TickerTape";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TickerTape />
      <Dashboard />
      <footer className="border-t border-border px-3 py-3 text-center text-[10px] uppercase tracking-[0.08em] text-faint">
        Data may be delayed or approximate · Not investment advice
      </footer>
    </div>
  );
}
