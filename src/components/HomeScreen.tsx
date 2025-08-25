import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Star } from 'lucide-react';

const todaysDate = new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

const dailyHoroscope = {
  title: "Today's Energy",
  description: "The stars align to bring clarity and new opportunities. Trust your intuition and embrace the cosmic energy surrounding you.",
  mood: "Optimistic",
  luckyNumber: 7,
  luckyColor: "Purple"
};

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1589167626936-9accfc5d68ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzcGFjZSUyMHN0YXJzJTIwcHVycGxlfGVufDF8fHx8MTc1NjA1MTcyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Cosmic background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      
      <div className="relative z-10 p-6 pb-20">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-white text-3xl mb-2">Cosmic Guide</h1>
          <div className="flex items-center justify-center text-white/80 text-sm">
            <Calendar size={16} className="mr-2" />
            {todaysDate}
          </div>
        </div>

        {/* Daily Horoscope Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white mb-6">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Star className="text-yellow-300 mr-2" size={24} />
              <h2 className="text-xl">{dailyHoroscope.title}</h2>
            </div>
            <p className="text-white/90 mb-4 leading-relaxed">
              {dailyHoroscope.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-purple-500/20 text-white border-purple-300/20">
                Mood: {dailyHoroscope.mood}
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-white border-purple-300/20">
                Lucky #: {dailyHoroscope.luckyNumber}
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-white border-purple-300/20">
                Color: {dailyHoroscope.luckyColor}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-4 text-center">
            <Star className="mx-auto mb-2 text-yellow-300" size={32} />
            <h3 className="mb-1">My Sign</h3>
            <p className="text-white/80 text-sm">View zodiac details</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-4 text-center">
            <div className="text-2xl mb-2">🔮</div>
            <h3 className="mb-1">Birth Chart</h3>
            <p className="text-white/80 text-sm">Explore your chart</p>
          </Card>
        </div>
      </div>
    </div>
  );
}