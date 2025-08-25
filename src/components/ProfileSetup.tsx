import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { User, MapPin, Calendar, Star, ArrowRight } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export interface UserProfile {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });
  
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && profile.name) {
      setStep(2);
    } else if (step === 2 && profile.dateOfBirth) {
      setStep(3);
    } else if (step === 3 && profile.placeOfBirth) {
      onComplete(profile);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return profile.name.length >= 2;
      case 2: return profile.dateOfBirth !== '';
      case 3: return profile.placeOfBirth.length >= 2;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm">
            Step {step} of 3
          </p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-4">
                  <User className="text-white" size={32} />
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">What's your name?</h2>
                <p className="text-gray-600 text-sm">This helps us personalize your experience</p>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="h-12 text-lg"
                />
              </div>

              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-12"
              >
                Continue
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4">
                  <Calendar className="text-white" size={32} />
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">When were you born?</h2>
                <p className="text-gray-600 text-sm">Your birth details help create accurate predictions</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
                  <Input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Time of Birth (Optional)</label>
                  <Input
                    type="time"
                    value={profile.timeOfBirth}
                    onChange={(e) => setProfile({...profile, timeOfBirth: e.target.value})}
                    className="h-12"
                    placeholder="For more accurate readings"
                  />
                  <p className="text-xs text-gray-500 mt-1">If unknown, we'll use 12:00 PM</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12"
                >
                  Continue
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4">
                  <MapPin className="text-white" size={32} />
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">Where were you born?</h2>
                <p className="text-gray-600 text-sm">Location helps determine planetary positions</p>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="City, State, Country"
                  value={profile.placeOfBirth}
                  onChange={(e) => setProfile({...profile, placeOfBirth: e.target.value})}
                  className="h-12"
                />
                <p className="text-xs text-gray-500 mt-1">e.g., Mumbai, Maharashtra, India</p>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12"
                >
                  Complete Setup
                  <Star className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <Button 
            onClick={() => onComplete(profile)}
            variant="ghost"
            className="text-gray-600 text-sm"
          >
            Skip for now (can complete later)
          </Button>
        </div>
      </div>
    </div>
  );
}