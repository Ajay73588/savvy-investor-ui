
import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import { Brain, TrendingUp, ChartBar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockRecommendations = [
  {
    asset: "Tech Growth ETF",
    type: "ETF",
    confidence: "High",
    potential: "+12.5%",
    risk: "Moderate"
  },
  {
    asset: "Sustainable Energy Fund",
    type: "Mutual Fund",
    confidence: "High",
    potential: "+15.2%",
    risk: "Moderate"
  },
  {
    asset: "Blue Chip Portfolio",
    type: "Stocks",
    confidence: "Very High",
    potential: "+8.7%",
    risk: "Low"
  },
  {
    asset: "Emerging Markets Bond",
    type: "Bond",
    confidence: "Medium",
    potential: "+6.4%",
    risk: "Low"
  }
];

const Investment = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Investment Recommendations Updated",
        description: "New personalized suggestions based on market conditions",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pb-20 md:pb-0 md:pl-20">
      <NavigationBar />
      
      <main className="container max-w-7xl px-4 md:px-8 py-8 md:py-12">
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient">Investment Advisor</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Personalized investment recommendations powered by AI
          </p>
        </header>

        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <ChartBar className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gradient">AI Recommendations</h2>
            </div>
            <button
              onClick={handleGetRecommendations}
              disabled={loading}
              className={`px-6 py-2.5 md:px-8 md:py-3 rounded-xl bg-primary text-primary-foreground font-semibold
                transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Brain className="w-4 h-4 md:w-5 md:h-5" />
              {loading ? "Analyzing..." : "Get Recommendations"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {mockRecommendations.map((item) => (
              <div key={item.asset} className="glass p-6 rounded-xl animate-float">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gradient">{item.asset}</h3>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {item.confidence} Confidence
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Potential Return</span>
                    <span className="font-medium text-green-400">{item.potential}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Risk Level</span>
                    <span className="font-medium">{item.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-xl p-6 md:p-8 lg:p-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">Market Intelligence</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            <p className="text-muted-foreground font-medium md:text-lg">
              Based on current market conditions and your risk profile:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 p-4 md:p-6 glass rounded-lg">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></span>
                <span className="font-medium md:text-lg">Consider increasing exposure to technology sector</span>
              </li>
              <li className="flex items-center gap-3 p-4 md:p-6 glass rounded-lg">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></span>
                <span className="font-medium md:text-lg">Maintain diversified portfolio with bond allocation</span>
              </li>
              <li className="flex items-center gap-3 p-4 md:p-6 glass rounded-lg">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-400"></span>
                <span className="font-medium md:text-lg">Look for opportunities in sustainable energy sector</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Investment;
