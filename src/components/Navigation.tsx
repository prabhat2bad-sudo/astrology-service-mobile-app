import { Home, User, Heart, Star, Moon } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'zodiac', icon: Star, label: 'Zodiac' },
    { id: 'compatibility', icon: Heart, label: 'Love' },
    { id: 'chart', icon: Moon, label: 'Chart' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-purple-200 z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 min-w-[60px] ${
                activeTab === tab.id
                  ? 'text-purple-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}