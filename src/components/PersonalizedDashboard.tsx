import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, Heart, Briefcase, DollarSign, Plane, Home, Baby, Stethoscope, Star, TrendingUp, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  userData: any;
}

const lifeCategories = [
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: Stethoscope,
    color: 'bg-green-500',
    description: 'Medical checkups, lab reports timing',
    alerts: 3,
    status: 'active'
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    icon: DollarSign,
    color: 'bg-blue-500',
    description: 'Investment timing, banking decisions',
    alerts: 2,
    status: 'warning'
  },
  {
    id: 'travel',
    name: 'Travel & Relocation',
    icon: Plane,
    color: 'bg-purple-500',
    description: 'Visa applications, travel timing',
    alerts: 1,
    status: 'active'
  },
  {
    id: 'relationships',
    name: 'Relationships',
    icon: Heart,
    color: 'bg-pink-500',
    description: 'Marriage, partnerships timing',
    alerts: 5,
    status: 'critical'
  },
  {
    id: 'career',
    name: 'Career & Jobs',
    icon: Briefcase,
    color: 'bg-orange-500',
    description: 'Job changes, promotions timing',
    alerts: 1,
    status: 'active'
  },
  {
    id: 'property',
    name: 'Real Estate',
    icon: Home,
    color: 'bg-indigo-500',
    description: 'Property buying, investments',
    alerts: 0,
    status: 'inactive'
  },
  {
    id: 'family',
    name: 'Family & Children',
    icon: Baby,
    color: 'bg-cyan-500',
    description: 'Child planning, family matters',
    alerts: 2,
    status: 'active'
  }
];

const recentAlerts = [
  {
    category: 'health',
    title: 'Favorable time for medical checkup',
    description: 'Next 7 days are auspicious for health screenings',
    priority: 'high',
    time: '2 hours ago'
  },
  {
    category: 'relationships',
    title: 'Venus enters favorable position',
    description: 'Good time for relationship discussions',
    priority: 'medium',
    time: '5 hours ago'
  },
  {
    category: 'finance',
    title: 'Avoid major investments',
    description: 'Mercury retrograde affecting financial decisions',
    priority: 'high',
    time: '1 day ago'
  }
];

export function PersonalizedDashboard({ userData }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="text-red-400" size={16} />;
      case 'warning': return <TrendingUp className="text-yellow-400" size={16} />;
      case 'active': return <Star className="text-green-400" size={16} />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-300/20';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-300/20';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-300/20';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-300/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-6 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-xl">Welcome back, {userData.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-white/80 text-sm">Your cosmic guidance for today</p>
          </div>
          <div className="relative">
            <Bell className="text-white" size={24} />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {recentAlerts.length}
            </div>
          </div>
        </div>

        {/* Today's Cosmic Summary */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="mb-1">Today's Energy</h3>
              <p className="text-white/80 text-sm">Strong planetary alignment for new beginnings</p>
            </div>
            <div className="text-right">
              <div className="text-2xl text-yellow-400">85%</div>
              <div className="text-xs text-white/80">Favorable</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-6">
        {/* Life Categories Grid */}
        <div className="mb-8">
          <h2 className="text-white text-lg mb-4">Life Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {lifeCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id}
                  className="bg-white/10 backdrop-blur-lg border-white/20 p-4 hover:bg-white/15 transition-colors cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${category.color}/20`}>
                      <Icon className="text-white" size={20} />
                    </div>
                    {category.alerts > 0 && (
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(category.status)}
                        <Badge className="bg-red-500/20 text-red-300 border-red-300/20 text-xs px-1.5 py-0.5">
                          {category.alerts}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-sm mb-1">{category.name}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">{category.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="mb-8">
          <h2 className="text-white text-lg mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white text-sm">{alert.title}</h3>
                  <Badge className={getPriorityColor(alert.priority)}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-white/80 text-xs mb-2">{alert.description}</p>
                <p className="text-white/60 text-xs">{alert.time}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Celebrity Match Feature */}
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-300/20 p-6 text-center">
          <Star className="mx-auto mb-3 text-yellow-400" size={32} />
          <h3 className="text-white text-lg mb-2">Celebrity Kundli Match</h3>
          <p className="text-white/80 text-sm mb-4">Discover which celebrity shares your cosmic blueprint</p>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
            Find My Celebrity Match
          </Button>
        </Card>
      </div>
    </div>
  );
}