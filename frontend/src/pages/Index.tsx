import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "@/components/NavigationBar";
import MarketCard from "@/components/MarketCard";
import { useToast } from "@/hooks/use-toast";
import { ChartLine, Brain, TrendingUp } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [marketData, setMarketData] = useState<
    { name: string; symbol: string; price: number; change: number; marketCap: string }[]
  >([]);
  const [loadingMarket, setLoadingMarket] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchSymbol, setSearchSymbol] = useState<string>(""); // State for user input
  const [searchError, setSearchError] = useState<string | null>(null);

  // Initial fetch (optional, removed here for search-only behavior)
  useEffect(() => {
    // No initial fetch; wait for user input
    setLoadingMarket(false); // Start with no loading state until search
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchSymbol.trim()) {
      setSearchError("Please enter a stock or crypto symbol");
      return;
    }

    setLoadingMarket(true);
    setError(null);
    setSearchError(null);
    setMarketData([]); // Clear previous results

    try {
      const response = await axios.get(`http://localhost:3001/api/search?symbol=${searchSymbol.toUpperCase()}`);
      console.log("Frontend received:", response.data);
      // Ensure response.data is an array for MarketCard mapping
      setMarketData([response.data]); // Wrap single object in array
      setLoadingMarket(false);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to fetch market data";
      setError(errorMsg);
      setLoadingMarket(false);
      console.error("Frontend error:", err);
    }
  };

  const handleGetInsights = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "AI Insights Generated",
        description: "Market analysis suggests a bullish trend in cryptocurrencies",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pb-20 md:pb-0 md:pl-20">
      <NavigationBar />
      <main className="container max-w-7xl px-4 md:px-8 py-8 md:py-12">
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient">AI Investment Advisor</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Get real-time market insights powered by advanced AI analysis
          </p>
        </header>

        <section className="mb-12 md:mb-16">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center justify-center gap-4 mb-6">
            <input
              type="text"
              value={searchSymbol}
              onChange={(e) => setSearchSymbol(e.target.value)}
              placeholder="Enter stock/crypto symbol (e.g., BTC-USD, TSLA)"
              className="p-2 rounded-lg border border-gray-300 text-black w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-105 transition-all"
            >
              Search
            </button>
          </form>

          {searchError && <div className="text-red-500 text-center mb-4">{searchError}</div>}

          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <ChartLine className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gradient">Market Trends</h2>
            </div>
            <button
              onClick={handleGetInsights}
              disabled={loading}
              className={`px-6 py-2.5 md:px-8 md:py-3 rounded-xl bg-primary text-primary-foreground font-semibold
                transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Brain className="w-4 h-4 md:w-5 md:h-5" />
              {loading ? "Analyzing..." : "Get AI Insights"}
            </button>
          </div>

          {loadingMarket ? (
            <div>Loading market data...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : marketData.length === 0 ? (
            <div className="text-muted-foreground">Enter a symbol to see market data</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {marketData.map((asset) => (
                <MarketCard key={asset.symbol} {...asset} />
              ))}
            </div>
          )}
        </section>

        <section className="glass rounded-xl p-6 md:p-8 lg:p-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">AI Market Analysis</h2>
          </div>
          <div className="space-y-4 md:space-y-6 text-left">
            <p className="text-muted-foreground font-medium md:text-lg">
              Based on current market conditions and AI analysis:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 p-4 md:p-6 glass rounded-lg">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></span>
                <span className="font-medium md:text-lg">Bitcoin shows strong growth potential</span>
              </li>
              <li className="flex items-center gap-3 p-4 md:p-6 glass rounded-lg">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></span>
                <span className="font-medium md:text-lg">Ethereum indicates moderate volatility</span>
              </li>
              <li className="flex items-center gap-3 p-4 md:p-6 glass rounded-lg">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-400"></span>
                <span className="font-medium md:text-lg">Crypto markets trending towards recovery</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;