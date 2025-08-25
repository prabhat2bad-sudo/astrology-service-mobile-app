import { Home, Star, Bell, User, Search } from "lucide-react";

interface AppNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount?: number;
}

export function AppNavigation({ activeTab, onTabChange, alertCount = 0 }: AppNavigationProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'celebrity', icon: Star, label: 'Celebrities' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: alertCount },
    { id: 'search', icon: Search, label: 'Explore' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-purple-200/50 z-50">
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 min-w-[60px] relative ${
                activeTab === tab.id
                  ? 'text-purple-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{tab.label}</span>
              {tab.badge && tab.badge > 0 && (
                <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}