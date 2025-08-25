import { Card } from './ui/card';
import { Badge } from './ui/badge';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', emoji: '🐏' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', emoji: '🐂' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', emoji: '👯' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', emoji: '🦀' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', emoji: '🦁' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', emoji: '👤' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', emoji: '⚖️' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', emoji: '🦂' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', emoji: '🏹' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', emoji: '🐐' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', emoji: '🏺' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', emoji: '🐟' },
];

const getElementColor = (element: string) => {
  switch (element) {
    case 'Fire': return 'bg-red-500/20 text-red-300 border-red-300/20';
    case 'Earth': return 'bg-green-500/20 text-green-300 border-green-300/20';
    case 'Air': return 'bg-blue-500/20 text-blue-300 border-blue-300/20';
    case 'Water': return 'bg-cyan-500/20 text-cyan-300 border-cyan-300/20';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-300/20';
  }
};

export function ZodiacScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-purple-800 p-6 pb-20">
      <div className="pt-8 mb-6">
        <h1 className="text-white text-2xl text-center mb-2">Zodiac Signs</h1>
        <p className="text-white/80 text-center text-sm">Discover the mysteries of each sign</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {zodiacSigns.map((sign) => (
          <Card key={sign.name} className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-4 hover:bg-white/15 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{sign.emoji}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg">{sign.name}</h3>
                    <span className="text-xl text-purple-300">{sign.symbol}</span>
                  </div>
                  <p className="text-white/70 text-sm">{sign.dates}</p>
                </div>
              </div>
              <Badge className={getElementColor(sign.element)}>
                {sign.element}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}