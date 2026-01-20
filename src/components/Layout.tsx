"use client";

import { Home, BarChart3, Menu, ShoppingCart, QrCode, Settings, ChevronLeft, ChevronRight, UtensilsCrossed, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

type Screen =
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'analytics'
  | 'menu'
  | 'orders'
  | 'staff'
  | 'tables'
  | 'settings';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Layout({ children, currentScreen, onNavigate }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems: { id: Screen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'tables', label: 'Tables & QR', icon: QrCode },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? 'w-[72px]' : 'w-[240px]'
        } bg-card border-r border-border flex flex-col transition-all duration-300 fixed h-full z-10`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-foreground">MenuOS</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors ml-auto"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Restaurant Selector */}
        <div className="px-3 py-4 border-b border-border">
          {!isCollapsed ? (
            <div className="px-3 py-2">
              <div className="text-xs text-muted-foreground mb-1">Restaurant</div>
              <div className="font-medium text-foreground">The Bistro</div>
            </div>
          ) : (
            <div className="w-full h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">TB</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative
                  ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r" />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle & User */}
        <div className="px-3 py-4 border-t border-border space-y-2">
          {!isCollapsed ? (
            <>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="text-sm font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">John Doe</div>
                  <div className="text-xs text-muted-foreground truncate">Owner</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={toggleTheme}
                className="w-full flex justify-center py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="w-full flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isCollapsed ? 'ml-[72px]' : 'ml-[240px]'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}