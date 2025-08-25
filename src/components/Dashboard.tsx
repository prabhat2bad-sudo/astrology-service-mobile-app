import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Heart, 
  Briefcase, 
  Home, 
  Plane, 
  CreditCard, 
  Activity,
  Baby,
  Star,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { UserProfile } from './ProfileSetup';

interface DashboardProps {
  userProfile: UserProfile;
  isGuest: boolean;
}

interface Alert {
  id: string;
  category: 'health' | 'travel' | 'finance' | 'property' | 'relationship' | 'child' | 'career';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  actionRequired: boolean;
}

const lifeCategoryIcons = {
  health: Activity,
  travel: Plane,
  finance: CreditCard,
  property: Home,
  relationship: Heart,
  child: Baby,
  career: Briefcase
};

const mockAlerts: Alert[] = [
  {
    id: '1',
    category: 'health',
    title: 'Health Check Recommendation',
    message: 'Saturn transit suggests scheduling routine health check-ups this month',
    priority: 'high',
    date: '2025-01-24',
    actionRequired: true
  },
  {
    id: '2',
    category: 'finance',
    title: 'Investment Opportunity',
    message: 'Jupiter alignment favors long-term investments until Feb 15th',
    priority: 'medium',
    date: '2025-01-23',
    actionRequired: false
  },
  {
    id: '3',
    category: 'travel',
    title: 'Travel Advisory',
    message: 'Avoid international travel between Jan 28-30. Domestic trips favorable',
    priority: 'medium',
    date: '2025-01-22',
    actionRequired: false
  },
  {
    id: '4',
    category: 'career',
    title: 'Job Change Timing',
    message: 'Excellent period for career advancement until March 2025',
    priority: 'high',
    date: '2025-01-21',
    actionRequired: true
  }
];

export function Dashboard({ userProfile, isGuest }: DashboardProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [alerts] = useState<Alert[]>(mockAlerts);

  const lifeCategories = [
    { id: 'health', name: 'Health', icon: Activity, color: 'bg-green-500', count: 1 },
    { id: 'travel', name: 'Travel', icon: Plane, color: 'bg-blue-500', count: 1 },
    { id: 'finance', name: 'Finance', icon: CreditCard, color: 'bg-yellow-500', count: 2 },
    { id: 'property', name: 'Property', icon: Home, color: 'bg-purple-500', count: 0 },
    { id: 'relationship', name: 'Relationship', icon: Heart, color: 'bg-pink-500', count: 0 },
    { id: 'child', name: 'Child', icon: Baby, color: 'bg-orange-500', count: 0 },
    { id: 'career', name: 'Career', icon: Briefcase, color: 'bg-indigo-500', count: 1 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredAlerts = activeCategory === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl">
              Welcome{userProfile.name ? `, ${userProfile.name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-orange-100 text-sm">
              {isGuest ? 'Guest Mode - Limited Features' : 'Your personalized cosmic dashboard'}
            </p>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {!isGuest && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center space-x-3 text-white">
              <Star className="text-yellow-300" size={24} />
              <div>
                <h3 className="text-sm opacity-90">Today's Cosmic Energy</h3>
                <p className="text-lg">Favorable for new beginnings and important decisions</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="p-6 pb-20">
        {/* Life Categories Grid */}
        <div className="mb-6">
          <h2 className="text-xl text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-orange-500" size={20} />
            Life Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifeCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    activeCategory === category.id ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-white'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${category.color} rounded-full mb-2`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <h3 className="text-sm text-gray-800">{category.name}</h3>
                    {category.count > 0 && (
                      <Badge className="mt-1 bg-red-100 text-red-600 text-xs">
                        {category.count}
                      </Badge>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-800 flex items-center">
              <AlertTriangle className="mr-2 text-orange-500" size={20} />
              Active Alerts
              {activeCategory !== 'all' && (
                <Badge className="ml-2 bg-orange-100 text-orange-700">
                  {lifeCategories.find(c => c.id === activeCategory)?.name}
                </Badge>
              )}
            </h2>
            {activeCategory !== 'all' && (
              <Button
                onClick={() => setActiveCategory('all')}
                variant="outline"
                size="sm"
              >
                View All
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <Card className="p-6 text-center bg-gray-50">
                <CheckCircle className="mx-auto mb-2 text-green-500" size={32} />
                <p className="text-gray-600">No active alerts for this category</p>
              </Card>
            ) : (
              filteredAlerts.map((alert) => {
                const CategoryIcon = lifeCategoryIcons[alert.category];
                return (
                  <Card key={alert.id} className="p-4 bg-white shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <CategoryIcon className="text-gray-600" size={16} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-gray-800">{alert.title}</h3>
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{alert.date}</span>
                          {alert.actionRequired && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-16 flex flex-col space-y-1 border-orange-200 hover:bg-orange-50"
            >
              <Star className="text-orange-500" size={20} />
              <span className="text-sm">Celebrity Match</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col space-y-1 border-purple-200 hover:bg-purple-50"
              disabled={isGuest}
            >
              <Bell className="text-purple-500" size={20} />
              <span className="text-sm">Set Alerts</span>
            </Button>
          </div>
        </div>

        {isGuest && (
          <Card className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <div className="text-center">
              <h3 className="mb-2">Unlock Full Features</h3>
              <p className="text-orange-100 text-sm mb-4">
                Register to access personalized alerts, celebrity matching, and more
              </p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Create Account
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}