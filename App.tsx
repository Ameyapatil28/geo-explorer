import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { OTPVerification } from './components/OTPVerification';
import { WorldMap } from './components/WorldMap';
import { DestinationInfo } from './components/DestinationInfo';
import { LogOut, Globe } from 'lucide-react';
import { signOut } from './lib/auth';

type AuthView = 'signin' | 'signup' | 'verify';

const MainApp = () => {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('signin');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<{
    country: string;
    region?: string;
  } | null>(null);

  const handleSignUpSuccess = (email: string) => {
    setVerifyEmail(email);
    setAuthView('verify');
  };

  const handleVerifySuccess = () => {
    setAuthView('signin');
  };

  const handleSignInSuccess = () => {
    window.location.reload();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCountrySelect = (country: string, region?: string) => {
    setSelectedDestination({ country, region });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900">Geo Explorer</h1>
            </div>
            <p className="text-xl text-gray-600">
              Discover the world's best food and destinations
            </p>
          </div>

          {authView === 'signup' && (
            <SignUp
              onSuccess={handleSignUpSuccess}
              onSwitchToSignIn={() => setAuthView('signin')}
            />
          )}

          {authView === 'signin' && (
            <SignIn
              onSuccess={handleSignInSuccess}
              onSwitchToSignUp={() => setAuthView('signup')}
            />
          )}

          {authView === 'verify' && (
            <OTPVerification
              email={verifyEmail}
              onSuccess={handleVerifySuccess}
              onBack={() => setAuthView('signup')}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Geo Explorer</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <WorldMap onCountrySelect={handleCountrySelect} />
          </div>

          <div>
            {selectedDestination ? (
              <DestinationInfo
                country={selectedDestination.country}
                region={selectedDestination.region}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Select a country or state to see recommendations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
