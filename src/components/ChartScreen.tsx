import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Moon, Sun, Star } from 'lucide-react';

export function ChartScreen() {
  const [birthData, setBirthData] = useState({
    date: '',
    time: '',
    location: ''
  });
  const [chart, setChart] = useState<any>(null);

  const generateChart = () => {
    if (birthData.date && birthData.time && birthData.location) {
      // Simplified chart generation
      const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
      const randomSign = () => signs[Math.floor(Math.random() * signs.length)];
      
      setChart({
        sun: randomSign(),
        moon: randomSign(),
        rising: randomSign(),
        mercury: randomSign(),
        venus: randomSign(),
        mars: randomSign()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1619472097305-296a228bce09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMG1vb24lMjBwaGFzZXN8ZW58MXx8fHwxNzU2MDUxNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Moon phases background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      <div className="relative z-10 p-6 pb-20">
        <div className="pt-8 mb-6 text-center">
          <Moon className="mx-auto mb-4 text-blue-300" size={48} />
          <h1 className="text-white text-2xl mb-2">Birth Chart</h1>
          <p className="text-white/80 text-sm">Discover your cosmic blueprint</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Birth Date</label>
              <Input
                type="date"
                value={birthData.date}
                onChange={(e) => setBirthData({...birthData, date: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Birth Time</label>
              <Input
                type="time"
                value={birthData.time}
                onChange={(e) => setBirthData({...birthData, time: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Birth Location</label>
              <Input
                type="text"
                placeholder="City, Country"
                value={birthData.location}
                onChange={(e) => setBirthData({...birthData, location: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
            </div>

            <Button 
              onClick={generateChart}
              disabled={!birthData.date || !birthData.time || !birthData.location}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Star className="mr-2" size={16} />
              Generate Chart
            </Button>
          </div>
        </Card>

        {chart && (
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sun className="text-yellow-400" size={24} />
                  <div>
                    <h3>Sun Sign</h3>
                    <p className="text-white/80 text-sm">Your core identity</p>
                  </div>
                </div>
                <span className="text-lg">{chart.sun}</span>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="text-blue-300" size={24} />
                  <div>
                    <h3>Moon Sign</h3>
                    <p className="text-white/80 text-sm">Your emotional nature</p>
                  </div>
                </div>
                <span className="text-lg">{chart.moon}</span>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Star className="text-purple-300" size={24} />
                  <div>
                    <h3>Rising Sign</h3>
                    <p className="text-white/80 text-sm">How others see you</p>
                  </div>
                </div>
                <span className="text-lg">{chart.rising}</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}