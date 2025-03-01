
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
    <div className="glass p-6 rounded-xl animate-float hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_15px_45px_0_rgba(0,0,0,0.45)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gradient">{name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{symbol}</p>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'} font-semibold`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold">₹{price.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground font-medium">Market Cap: {marketCap}</p>
      </div>
    </div>
  );
};

export default MarketCard;
