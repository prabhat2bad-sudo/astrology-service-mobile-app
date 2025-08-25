import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Sparkles } from 'lucide-react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const getCompatibilityScore = (sign1: string, sign2: string) => {
  // Simplified compatibility logic
  const compatible = {
    'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
    'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
    'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    'Aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    'Pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
  };

  if (compatible[sign1]?.includes(sign2)) {
    return Math.floor(Math.random() * 20) + 80; // 80-100%
  } else {
    return Math.floor(Math.random() * 40) + 40; // 40-80%
  }
};

export function CompatibilityScreen() {
  const [yourSign, setYourSign] = useState('');
  const [partnerSign, setPartnerSign] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const checkCompatibility = () => {
    if (yourSign && partnerSign) {
      const score = getCompatibilityScore(yourSign, partnerSign);
      setResult(score);
    }
  };

  const getCompatibilityMessage = (score: number) => {
    if (score >= 80) return "Cosmic Connection! The stars align perfectly for you two.";
    if (score >= 60) return "Great potential! With understanding, this could be beautiful.";
    if (score >= 40) return "Different energies, but opposites can attract with effort.";
    return "Challenging match, but true love can overcome any cosmic obstacle.";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900 via-purple-900 to-indigo-900 p-6 pb-20">
      <div className="pt-8 mb-6 text-center">
        <Heart className="mx-auto mb-4 text-pink-300" size={48} />
        <h1 className="text-white text-2xl mb-2">Love Compatibility</h1>
        <p className="text-white/80 text-sm">Discover your cosmic connection</p>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Your Zodiac Sign</label>
            <Select value={yourSign} onValueChange={setYourSign}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select your sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-2">Partner's Zodiac Sign</label>
            <Select value={partnerSign} onValueChange={setPartnerSign}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select partner's sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={checkCompatibility}
            disabled={!yourSign || !partnerSign}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Sparkles className="mr-2" size={16} />
            Check Compatibility
          </Button>
        </div>
      </Card>

      {result !== null && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6 text-center">
          <div className="mb-4">
            <div className={`text-4xl mb-2 ${getScoreColor(result)}`}>
              {result}%
            </div>
            <p className="text-white/90">
              {getCompatibilityMessage(result)}
            </p>
          </div>
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                size={20}
                className={
                  i < Math.floor(result / 20)
                    ? 'text-pink-400 fill-current'
                    : 'text-gray-500'
                }
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}