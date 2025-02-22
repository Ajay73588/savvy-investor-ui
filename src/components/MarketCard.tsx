
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  marketCap: string;
}

const MarketCard = ({ name, symbol, price, change, marketCap }: MarketCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="glass p-6 rounded-xl animate-fade-in hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{symbol}</p>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-medium">{change}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold">${price.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Market Cap: {marketCap}</p>
      </div>
    </div>
  );
};

export default MarketCard;
