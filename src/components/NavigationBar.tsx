
import { Home, ChartLine, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ChartLine, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Investment", path: "/investment" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full md:top-0 md:w-20 h-16 md:h-screen glass z-50">
      <div className="flex md:flex-col items-center justify-around md:justify-center h-full gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center group relative"
            >
              <div className={`relative p-3 rounded-xl transition-all duration-300 
                ${isActive ? 'bg-primary/20 scale-110' : 'hover:bg-primary/20 hover:scale-110'}`}>
                <item.icon className={`w-5 h-5 transition-colors
                  ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
              </div>
              <span className={`text-xs font-medium transition-colors
                ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;
