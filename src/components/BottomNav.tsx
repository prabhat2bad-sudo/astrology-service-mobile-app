import { Home, Star, Bell, User, Sparkles } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'celebrity', icon: Sparkles, label: 'Celebrity' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 min-w-[60px] py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
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