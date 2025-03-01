import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "@/components/NavigationBar";
import { Brain, DollarSign, ChartBar, ChartPie } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<
    { title: string; value: string; change: string; isPositive: boolean }[]
  >([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch crypto data from backend
        const response = await axios.get("http://localhost:3001/api/market-data");
        console.log("Dashboard received:", response.data); // Debug log
        const cryptoData = response.data.reduce((acc: any, asset: any) => {
          acc[asset.symbol] = asset.price;
          return acc;
        }, {});

        // Define portfolio holdings
        const holdings = [
          { symbol: "BTC-USD", qty: 1 },
          { symbol: "ETH-USD", qty: 10 },
        ];

        // Calculate total portfolio value
        const totalValue = holdings.reduce((sum, holding) => {
          const price = cryptoData[holding.symbol];
          return sum + (price * holding.qty);
        }, 0);

        const analyticsData = [
          {
            title: "Total Portfolio",
            value: `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
            change: `${response.data[0].change.toFixed(2)}%`, // BTC change as example
            isPositive: response.data[0].change >= 0,
          },
          {
            title: "Monthly Savings",
            value: "$2,850", // Static placeholder
            change: "+12.3%",
            isPositive: true,
          },
          {
            title: "Risk Level",
            value: "Moderate", // Static placeholder
            change: "Balanced",
            isPositive: true,
          },
          {
            title: "AI Confidence",
            value: "92%", // Static placeholder
            change: "+2.1%",
            isPositive: true,
          },
        ];

        setAnalytics(analyticsData);
        setLoadingAnalytics(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch analytics data");
        setLoadingAnalytics(false);
        console.error("Dashboard error:", err);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleRefreshInsights = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Latest cryptocurrency insights have been generated",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pb-20 md:pb-0 md:pl-20">
      <NavigationBar />
      <main className="container max-w-7xl px-4 md:px-8 py-8 md:py-12">
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient">Financial Dashboard</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Your personalized AI-powered cryptocurrency overview
          </p>
        </header>

        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <ChartPie className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gradient">Portfolio Overview</h2>
            </div>
            <button
              onClick={handleRefreshInsights}
              disabled={loading}
              className={`px-6 py-2.5 md:px-8 md:py-3 rounded-xl bg-primary text-primary-foreground font-semibold
                transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Brain className="w-4 h-4 md:w-5 md:h-5" />
              {loading ? "Analyzing..." : "Refresh Insights"}
            </button>
          </div>

          {loadingAnalytics ? (
            <div>Loading analytics...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {analytics.map((item) => (
                <div key={item.title} className="glass p-6 rounded-xl animate-float">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-muted-foreground">{item.title}</h3>
                    <span className={`text-sm font-medium ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gradient">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="glass rounded-xl p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gradient">Spending Analysis</h2>
            </div>
            <div className="space-y-4">
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                Spending chart will be implemented here
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <ChartBar className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gradient">Investment Distribution</h2>
            </div>
            <div className="space-y-4">
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                Investment distribution chart will be implemented here
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;