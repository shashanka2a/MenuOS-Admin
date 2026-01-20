"use client";

import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { Layout } from './components/Layout';
import { DashboardHome } from './components/DashboardHome';
import { Analytics } from './components/Analytics';
import { MenuManagement } from './components/MenuManagement';
import { Orders } from './components/Orders';
import { Staff } from './components/Staff';
import { TablesQR } from './components/TablesQR';
import { Settings } from './components/Settings';

type Screen = 'auth' | 'onboarding' | 'dashboard' | 'analytics' | 'menu' | 'orders' | 'staff' | 'tables' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentScreen('onboarding');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsOnboarded(true);
    setCurrentScreen('dashboard');
  };

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    setCurrentScreen('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Auth onSignup={handleSignup} onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  if (!isOnboarded) {
    return (
      <ThemeProvider>
        <Onboarding onComplete={handleOnboardingComplete} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
        {(() => {
          switch (currentScreen) {
            case 'dashboard':
              return <DashboardHome />;
            case 'analytics':
              return <Analytics />;
            case 'menu':
              return <MenuManagement />;
            case 'orders':
              return <Orders />;
            case 'staff':
              return <Staff />;
            case 'tables':
              return <TablesQR />;
            case 'settings':
              return <Settings />;
            default:
              return <DashboardHome />;
          }
        })()}
      </Layout>
    </ThemeProvider>
  );
}