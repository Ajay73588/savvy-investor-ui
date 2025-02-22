import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import MarketCard from "@/components/MarketCard";
import { useToast } from "@/hooks/use-toast";
import { ChartLineUp, Brain, TrendingUp } from "lucide-react";

// Temporary mock data
const mockMarketData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 43567.89,
    change: 2.45,
    marketCap: "$845.2B"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2234.56,
    change: -1.23,
    marketCap: "$268.9B"
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    price: 248.50,
    change: 3.78,
    marketCap: "$788.4B"
  },
  {
    name: "Apple",
    symbol: "AAPL",
    price: 175.34,
    change: -0.45,
    marketCap: "$2.74T"
  }
];

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleGetInsights = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "AI Insights Generated",
        description: "Market analysis suggests a bullish trend in tech sector",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pb-20 md:pb-0 md:pl-20">
      <NavigationBar />
      
      <main className="container max-w-6xl px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-gradient">AI Investment Advisor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Get real-time market insights powered by advanced AI analysis
          </p>
        </header>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ChartLineUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gradient">Market Trends</h2>
            </div>
            <button
              onClick={handleGetInsights}
              disabled={loading}
              className={`px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold
                transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Brain className="w-4 h-4" />
              {loading ? "Analyzing..." : "Get AI Insights"}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMarketData.map((asset) => (
              <MarketCard key={asset.symbol} {...asset} />
            ))}
          </div>
        </section>

        <section className="glass rounded-xl p-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gradient">AI Market Analysis</h2>
          </div>
          <div className="space-y-4 text-left">
            <p className="text-muted-foreground font-medium">
              Based on current market conditions and AI analysis:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 p-4 glass rounded-lg">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="font-medium">Tech sector shows strong growth potential</span>
              </li>
              <li className="flex items-center gap-3 p-4 glass rounded-lg">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="font-medium">Cryptocurrency market indicates moderate volatility</span>
              </li>
              <li className="flex items-center gap-3 p-4 glass rounded-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="font-medium">Global markets trending towards recovery</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
