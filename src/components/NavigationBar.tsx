
import { Home, ChartLine, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ChartLine, label: "AI Advisor", path: "/advisor" },
    { icon: User, label: "Portfolio", path: "/portfolio" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full md:top-0 md:w-20 h-16 md:h-screen bg-background border-t md:border-r border-border z-50">
      <div className="flex md:flex-col items-center justify-around md:justify-center h-full gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex flex-col items-center group relative"
          >
            <div className="relative p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/10">
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
