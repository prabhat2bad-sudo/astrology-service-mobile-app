import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, MapPin, Calendar, Clock } from 'lucide-react';

interface RegistrationFormProps {
  onComplete: (userData: any) => void;
}

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 
  'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad',
  'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli'
];

export function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [userData, setUserData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    gender: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate profile creation
    setTimeout(() => {
      setIsLoading(false);
      onComplete({
        ...userData,
        registrationComplete: true
      });
    }, 2000);
  };

  const isFormValid = userData.name && userData.birthDate && userData.birthTime && userData.birthPlace && userData.gender;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <User className="mx-auto mb-4 text-yellow-400" size={48} />
          <h1 className="text-white text-2xl mb-2">Complete Your Profile</h1>
          <p className="text-white/80 text-sm">Help us create your personalized cosmic blueprint</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm mb-2">
                <User className="inline mr-2" size={16} />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                <Calendar className="inline mr-2" size={16} />
                Date of Birth
              </label>
              <Input
                type="date"
                value={userData.birthDate}
                onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                <Clock className="inline mr-2" size={16} />
                Time of Birth
              </label>
              <Input
                type="time"
                value={userData.birthTime}
                onChange={(e) => setUserData({...userData, birthTime: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
              <p className="text-white/60 text-xs mt-1">Exact time helps create accurate predictions</p>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                <MapPin className="inline mr-2" size={16} />
                Place of Birth
              </label>
              <Select value={userData.birthPlace} onValueChange={(value) => setUserData({...userData, birthPlace: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select your birth city" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {indianCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Gender</label>
              <Select value={userData.gender} onValueChange={(value) => setUserData({...userData, gender: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {isLoading ? 'Creating Your Profile...' : 'Create My Cosmic Profile'}
            </Button>
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-white/60 text-xs">
            Your birth details are used only for astrological calculations and are kept secure
          </p>
        </div>
      </div>
    </div>
  );
}