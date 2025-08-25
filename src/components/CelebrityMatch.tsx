import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, Heart, TrendingUp, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CelebrityMatchProps {
  userData: any;
  onBack: () => void;
}

const celebrityMatches = [
  {
    name: 'Shah Rukh Khan',
    profession: 'Actor',
    matchPercentage: 92,
    sharedTraits: ['Leadership', 'Creativity', 'Charisma'],
    birthDate: 'November 2, 1965',
    zodiacSign: 'Scorpio',
    image: 'bollywood actor portrait'
  },
  {
    name: 'Priyanka Chopra',
    profession: 'Actor & Producer',
    matchPercentage: 87,
    sharedTraits: ['Ambition', 'Versatility', 'Global Vision'],
    birthDate: 'July 18, 1982',
    zodiacSign: 'Cancer',
    image: 'indian actress portrait'
  },
  {
    name: 'Virat Kohli',
    profession: 'Cricketer',
    matchPercentage: 85,
    sharedTraits: ['Determination', 'Excellence', 'Leadership'],
    birthDate: 'November 5, 1988',
    zodiacSign: 'Scorpio',
    image: 'indian cricket player'
  },
  {
    name: 'A.R. Rahman',
    profession: 'Music Composer',
    matchPercentage: 83,
    sharedTraits: ['Creativity', 'Spirituality', 'Innovation'],
    birthDate: 'January 6, 1967',
    zodiacSign: 'Capricorn',
    image: 'indian music composer'
  }
];

export function CelebrityMatch({ userData, onBack }: CelebrityMatchProps) {
  const [selectedCelebrity, setSelectedCelebrity] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCelebrity = (celebrity: any) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setSelectedCelebrity(celebrity);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-yellow-400';
    if (percentage >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 text-center max-w-sm">
          <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-yellow-400 rounded-full mx-auto mb-4"></div>
          <h3 className="text-white text-lg mb-2">Analyzing Cosmic Patterns</h3>
          <p className="text-white/80 text-sm">Comparing planetary positions and birth charts...</p>
        </Card>
      </div>
    );
  }

  if (selectedCelebrity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6 pb-20">
        <div className="pt-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedCelebrity(null)}
            className="text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Matches
          </Button>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 mb-6">
            <div className="text-center mb-6">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                alt={selectedCelebrity.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-white text-2xl mb-1">{selectedCelebrity.name}</h1>
              <p className="text-white/80 text-sm mb-3">{selectedCelebrity.profession}</p>
              <div className={`text-4xl mb-2 ${getMatchColor(selectedCelebrity.matchPercentage)}`}>
                {selectedCelebrity.matchPercentage}%
              </div>
              <p className="text-white/80 text-sm">Cosmic Compatibility</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-white/60 text-xs mb-1">Birth Date</div>
                <div className="text-white text-sm">{selectedCelebrity.birthDate}</div>
              </div>
              <div className="text-center">
                <div className="text-white/60 text-xs mb-1">Zodiac Sign</div>
                <div className="text-white text-sm">{selectedCelebrity.zodiacSign}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white text-sm mb-3 flex items-center">
                <Star className="mr-2 text-yellow-400" size={16} />
                Shared Cosmic Traits
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCelebrity.sharedTraits.map((trait: string, index: number) => (
                  <Badge key={index} className="bg-yellow-500/20 text-yellow-300 border-yellow-300/20">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-white/10 border-white/20 p-4">
                <h4 className="text-white text-sm mb-2 flex items-center">
                  <Heart className="mr-2 text-pink-400" size={14} />
                  Relationship Compatibility
                </h4>
                <p className="text-white/80 text-xs">Strong emotional connection and understanding</p>
              </Card>

              <Card className="bg-white/10 border-white/20 p-4">
                <h4 className="text-white text-sm mb-2 flex items-center">
                  <TrendingUp className="mr-2 text-blue-400" size={14} />
                  Career Alignment
                </h4>
                <p className="text-white/80 text-xs">Similar ambition and professional drive</p>
              </Card>

              <Card className="bg-white/10 border-white/20 p-4">
                <h4 className="text-white text-sm mb-2 flex items-center">
                  <Users className="mr-2 text-green-400" size={14} />
                  Life Path Similarity
                </h4>
                <p className="text-white/80 text-xs">Aligned life purposes and spiritual journey</p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6 pb-20">
      <div className="pt-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/80 hover:text-white mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <Star className="mx-auto mb-4 text-yellow-400" size={48} />
          <h1 className="text-white text-2xl mb-2">Celebrity Kundli Matches</h1>
          <p className="text-white/80 text-sm">Discover celebrities who share your cosmic blueprint</p>
        </div>

        <div className="space-y-4">
          {celebrityMatches.map((celebrity, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-lg border-white/20 p-4 hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => analyzeCelebrity(celebrity)}
            >
              <div className="flex items-center space-x-4">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face`}
                  alt={celebrity.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white text-sm">{celebrity.name}</h3>
                    <span className={`text-sm ${getMatchColor(celebrity.matchPercentage)}`}>
                      {celebrity.matchPercentage}%
                    </span>
                  </div>
                  <p className="text-white/70 text-xs mb-2">{celebrity.profession}</p>
                  <div className="flex flex-wrap gap-1">
                    {celebrity.sharedTraits.slice(0, 2).map((trait, i) => (
                      <Badge key={i} className="bg-purple-500/20 text-purple-300 border-purple-300/20 text-xs px-1.5 py-0.5">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}