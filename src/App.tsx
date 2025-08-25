import { useState } from 'react';

// Simple types
type AppState = 'auth' | 'profile-setup' | 'main';
type UserType = 'registered' | 'guest' | null;

interface UserProfile {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

// Simple Auth Screen Component
function AuthScreen({ onAuth }: { onAuth: (type: 'registered' | 'guest') => void }) {
  const [authStep, setAuthStep] = useState<'method' | 'phone' | 'email' | 'otp'>('method');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');

  const sendOTP = () => setAuthStep('otp');
  const verifyOTP = () => otp.length >= 4 && onAuth('registered');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">⭐</span>
          </div>
          <h1 className="text-3xl text-gray-800 mb-2">Astro Neem</h1>
          <p className="text-gray-600">Personalized Life Guidance</p>
        </div>

        {authStep === 'method' && (
          <div className="space-y-4">
            <h2 className="text-xl text-gray-800 text-center mb-6">Welcome Back</h2>
            
            <button 
              onClick={() => setAuthStep('phone')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>📱</span>
              <span>Continue with Phone Number</span>
            </button>

            <button 
              onClick={() => setAuthStep('email')}
              className="w-full border border-orange-200 text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>📧</span>
              <span>Continue with Email</span>
            </button>

            <div className="text-center my-4">
              <span className="text-gray-500">or</span>
            </div>

            <button 
              onClick={() => onAuth('guest')}
              className="w-full text-gray-600 hover:bg-gray-50 py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>Continue as Guest</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full ml-2">Limited</span>
            </button>
          </div>
        )}

        {(authStep === 'phone' || authStep === 'email') && (
          <div className="space-y-4">
            <h2 className="text-xl text-gray-800 text-center mb-6">
              Enter {authStep === 'phone' ? 'Phone Number' : 'Email'}
            </h2>
            
            <input
              type={authStep === 'phone' ? 'tel' : 'email'}
              placeholder={authStep === 'phone' ? '+91 98765 43210' : 'your@email.com'}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />

            <button 
              onClick={sendOTP}
              disabled={!contact}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
            >
              Send OTP
            </button>

            <button 
              onClick={() => setAuthStep('method')}
              className="w-full text-gray-600 hover:bg-gray-50 py-2"
            >
              Back to Login Options
            </button>
          </div>
        )}

        {authStep === 'otp' && (
          <div className="space-y-4">
            <h2 className="text-xl text-gray-800 text-center mb-6">Enter Verification Code</h2>
            <p className="text-gray-600 text-sm text-center mb-4">
              Code sent to {contact}
            </p>
            
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg tracking-widest focus:ring-2 focus:ring-green-500"
              maxLength={6}
            />

            <button 
              onClick={verifyOTP}
              disabled={otp.length < 4}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
            >
              Verify & Continue
            </button>

            <button 
              onClick={() => setAuthStep(authStep === 'phone' ? 'phone' : 'email')}
              className="w-full text-gray-600 hover:bg-gray-50 py-2"
            >
              Change {authStep === 'phone' ? 'Phone Number' : 'Email'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Profile Setup Component
function ProfileSetup({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && profile.name) setStep(2);
    else if (step === 2 && profile.dateOfBirth) setStep(3);
    else if (step === 3 && profile.placeOfBirth) onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i <= step ? 'bg-orange-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">Step {step} of 3</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">👤</span>
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">What's your name?</h2>
                <p className="text-gray-600 text-sm">This helps us personalize your experience</p>
              </div>

              <input
                type="text"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <button 
                onClick={handleNext}
                disabled={!profile.name}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📅</span>
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">When were you born?</h2>
                <p className="text-gray-600 text-sm">Your birth details help create accurate predictions</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Time of Birth (Optional)</label>
                  <input
                    type="time"
                    value={profile.timeOfBirth}
                    onChange={(e) => setProfile({...profile, timeOfBirth: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">If unknown, we'll use 12:00 PM</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!profile.dateOfBirth}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📍</span>
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">Where were you born?</h2>
                <p className="text-gray-600 text-sm">Location helps determine planetary positions</p>
              </div>

              <input
                type="text"
                placeholder="City, State, Country"
                value={profile.placeOfBirth}
                onChange={(e) => setProfile({...profile, placeOfBirth: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />

              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!profile.placeOfBirth}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
                >
                  Complete Setup ⭐
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple Dashboard Component
function Dashboard({ userProfile, isGuest }: { userProfile: UserProfile; isGuest: boolean }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const lifeCategories = [
    { id: 'health', name: 'Health', icon: '🏥', color: 'bg-green-500', count: 1 },
    { id: 'travel', name: 'Travel', icon: '✈️', color: 'bg-blue-500', count: 1 },
    { id: 'finance', name: 'Finance', icon: '💰', color: 'bg-yellow-500', count: 2 },
    { id: 'property', name: 'Property', icon: '🏠', color: 'bg-purple-500', count: 0 },
    { id: 'relationship', name: 'Relationship', icon: '❤️', color: 'bg-pink-500', count: 0 },
    { id: 'child', name: 'Child', icon: '👶', color: 'bg-orange-500', count: 0 },
    { id: 'career', name: 'Career', icon: '💼', color: 'bg-indigo-500', count: 1 }
  ];

  const alerts = [
    {
      category: 'health',
      title: 'Health Check Recommendation',
      message: 'Saturn transit suggests scheduling routine health check-ups this month',
      priority: 'high'
    },
    {
      category: 'finance',
      title: 'Investment Opportunity',
      message: 'Jupiter alignment favors long-term investments until Feb 15th',
      priority: 'medium'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
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
            <span className="text-2xl">🔔</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {!isGuest && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 text-white">
              <span className="text-2xl">⭐</span>
              <div>
                <h3 className="text-sm opacity-90">Today's Cosmic Energy</h3>
                <p className="text-lg">Favorable for new beginnings and important decisions</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Life Categories Grid */}
        <div className="mb-6">
          <h2 className="text-xl text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Life Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifeCategories.map((category) => (
              <div 
                key={category.id}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                  activeCategory === category.id ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${category.color} rounded-full mb-2`}>
                    <span className="text-white text-lg">{category.icon}</span>
                  </div>
                  <h3 className="text-sm text-gray-800">{category.name}</h3>
                  {category.count > 0 && (
                    <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mb-6">
          <h2 className="text-xl text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            Active Alerts
          </h2>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span>🔔</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-800">{alert.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.priority === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="h-16 bg-white border border-orange-200 hover:bg-orange-50 rounded-lg flex flex-col items-center justify-center space-y-1">
              <span className="text-xl">⭐</span>
              <span className="text-sm">Celebrity Match</span>
            </button>
            <button 
              className="h-16 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex flex-col items-center justify-center space-y-1 disabled:opacity-50"
              disabled={isGuest}
            >
              <span className="text-xl">🔔</span>
              <span className="text-sm">Set Alerts</span>
            </button>
          </div>
        </div>

        {isGuest && (
          <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4">
            <div className="text-center">
              <h3 className="mb-2">Unlock Full Features</h3>
              <p className="text-orange-100 text-sm mb-4">
                Register to access personalized alerts, celebrity matching, and more
              </p>
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-2 rounded-lg">
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Celebrity Match Component
function CelebrityMatch({ userProfile, onBack }: { userProfile: UserProfile; onBack: () => void }) {
  const [showResults, setShowResults] = useState(false);

  const celebrities = [
    { name: 'Shah Rukh Khan', profession: 'Actor', match: 92, zodiac: 'Scorpio' },
    { name: 'Priyanka Chopra', profession: 'Actress', match: 87, zodiac: 'Cancer' },
    { name: 'Virat Kohli', profession: 'Cricketer', match: 84, zodiac: 'Scorpio' },
    { name: 'A.R. Rahman', profession: 'Composer', match: 81, zodiac: 'Capricorn' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-white hover:bg-white/20 px-3 py-2 rounded-lg"
          >
            ← Back
          </button>
          <h1 className="text-xl">Celebrity Kundli Match</h1>
          <div></div>
        </div>
      </div>

      <div className="p-6">
        {!showResults ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">Ready to Discover?</h2>
                <p className="text-gray-600">
                  We'll analyze your birth chart and find celebrities with similar planetary alignments
                </p>
              </div>

              {userProfile.name && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg text-gray-800 mb-2">Your Profile</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>DOB:</strong> {userProfile.dateOfBirth || 'Not provided'}</p>
                    <p><strong>Place:</strong> {userProfile.placeOfBirth || 'Not provided'}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>⭐</span>
                <span>Find My Celebrity Match</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl text-gray-800 mb-2">Your Celebrity Matches</h2>
              <p className="text-gray-600">Based on planetary position compatibility</p>
            </div>

            <div className="space-y-4">
              {celebrities.map((celebrity, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-800">{celebrity.name}</h3>
                        <p className="text-sm text-gray-600">{celebrity.profession}</p>
                        <p className="text-xs text-gray-500">{celebrity.zodiac}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg ${
                        celebrity.match >= 85 ? 'text-green-600' : 
                        celebrity.match >= 75 ? 'text-blue-600' : 'text-yellow-600'
                      }`}>
                        {celebrity.match}%
                      </div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Bottom Navigation
function BottomNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'celebrity', icon: '⭐', label: 'Celebrity' },
    { id: 'alerts', icon: '🔔', label: 'Alerts' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 min-w-[60px] py-2 px-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'text-orange-600 bg-orange-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// Main App Component
export default function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [userType, setUserType] = useState<UserType>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAuth = (type: 'registered' | 'guest') => {
    setUserType(type);
    if (type === 'guest') {
      setAppState('main');
    } else {
      setAppState('profile-setup');
    }
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('main');
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            userProfile={userProfile} 
            isGuest={userType === 'guest'} 
          />
        );
      case 'celebrity':
        return (
          <CelebrityMatch 
            userProfile={userProfile}
            onBack={() => setActiveTab('dashboard')}
          />
        );
      case 'alerts':
        return (
          <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center pb-20">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🔔</span>
              <h2 className="text-2xl text-gray-800 mb-4">Alerts & Notifications</h2>
              <p className="text-gray-600">Detailed alert management coming soon</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center pb-20">
            <div className="text-center">
              <span className="text-6xl mb-4 block">👤</span>
              <h2 className="text-2xl text-gray-800 mb-4">Profile Settings</h2>
              <p className="text-gray-600 mb-4">Profile management coming soon</p>
              {userType === 'guest' && (
                <button 
                  onClick={() => setAppState('auth')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
                >
                  Sign Up for Full Features
                </button>
              )}
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            userProfile={userProfile} 
            isGuest={userType === 'guest'} 
          />
        );
    }
  };

  if (appState === 'auth') {
    return <AuthScreen onAuth={handleAuth} />;
  }

  if (appState === 'profile-setup') {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  return (
    <div className="size-full overflow-hidden">
      {renderMainContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}