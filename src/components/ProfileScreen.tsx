import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Settings, Star } from 'lucide-react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: '',
    zodiacSign: '',
    birthDate: '',
    bio: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = () => {
    setIsEditing(false);
    // In a real app, this would save to a database
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 p-6 pb-20">
      <div className="pt-8 mb-6 text-center">
        <User className="mx-auto mb-4 text-purple-300" size={48} />
        <h1 className="text-white text-2xl mb-2">Your Profile</h1>
        <p className="text-white/80 text-sm">Personalize your cosmic journey</p>
      </div>

      {/* Profile Avatar */}
      <div className="flex justify-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src="" alt="Profile" />
          <AvatarFallback className="bg-purple-500 text-white text-xl">
            {profile.name.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Personal Information</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Settings size={16} className="mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <Input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              disabled={!isEditing}
              placeholder="Enter your name"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Zodiac Sign</label>
            <Select 
              value={profile.zodiacSign} 
              onValueChange={(value) => setProfile({...profile, zodiacSign: value})}
              disabled={!isEditing}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white disabled:opacity-60">
                <SelectValue placeholder="Select your zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-2">Birth Date</label>
            <Input
              type="date"
              value={profile.birthDate}
              onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
              disabled={!isEditing}
              className="bg-white/10 border-white/20 text-white disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              className="w-full h-20 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 disabled:opacity-60 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {isEditing && (
            <Button 
              onClick={saveProfile}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Save Profile
            </Button>
          )}
        </div>
      </Card>

      {/* Cosmic Stats */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6">
        <h3 className="text-lg mb-4 flex items-center">
          <Star className="mr-2 text-yellow-300" size={20} />
          Your Cosmic Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl text-purple-300 mb-1">127</div>
            <div className="text-sm text-white/80">Days Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-blue-300 mb-1">45</div>
            <div className="text-sm text-white/80">Readings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-pink-300 mb-1">8</div>
            <div className="text-sm text-white/80">Compatibility Checks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-green-300 mb-1">3</div>
            <div className="text-sm text-white/80">Charts Generated</div>
          </div>
        </div>
      </Card>
    </div>
  );
}