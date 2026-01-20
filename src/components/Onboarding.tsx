import { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, Link as LinkIcon, UtensilsCrossed, Check, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

interface OnboardingProps {
  onComplete?: () => void;
}

interface OnboardingData {
  restaurantName: string;
  ownerName: string;
  location: string;
  phone: string;
  menuType: 'upload' | 'url';
  menuFile: File | null;
  menuUrl: string;
  tables: string;
  capacity: string;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { theme, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    restaurantName: '',
    ownerName: '',
    location: '',
    phone: '',
    menuType: 'upload',
    menuFile: null,
    menuUrl: '',
    tables: '',
    capacity: '',
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({ ...data, menuFile: e.target.files[0] });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.restaurantName && data.ownerName && data.location && data.phone;
      case 2:
        return data.menuType === 'upload' ? data.menuFile !== null : data.menuUrl.trim() !== '';
      case 3:
        return data.tables && data.capacity;
      default:
        return false;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors shadow-sm z-50"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-foreground" />
          ) : (
            <Sun className="w-5 h-5 text-foreground" />
          )}
        </button>

        <div className="w-full max-w-lg">
          <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
            <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-[28px] font-semibold text-foreground mb-3">
              Onboarding complete!
            </h1>
            <p className="text-muted-foreground mb-4">
              Our team will reach out to you once your dashboard is ready.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              We do a one-time professional digitization of your menu to ensure
              100% accuracy before going live. This usually takes up to 24 hours.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors font-medium"
            >
              Go to dashboard
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 MenuOS. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Theme Toggle - Top Right */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors shadow-sm z-50"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-foreground" />
        ) : (
          <Sun className="w-5 h-5 text-foreground" />
        )}
      </button>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[32px] font-semibold text-foreground mb-2">Welcome to MenuOS</h1>
          <p className="text-muted-foreground">Let's set up your restaurant in a few simple steps</p>
        </div>

        {/* Progress Bar - Outside Form */}
        <div className="mb-8">
          <div className="flex items-start justify-center">
            {[
              { num: 1, label: 'Basic Info' },
              { num: 2, label: 'Menu' },
              { num: 3, label: 'Tables' }
            ].map((step, index) => (
              <div key={step.num} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all mb-2 ${
                      step.num < currentStep
                        ? 'bg-primary text-white'
                        : step.num === currentStep
                        ? 'bg-primary text-white ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.num < currentStep ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{step.label}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-[2px] transition-all mt-6 ${
                      step.num < currentStep ? 'bg-primary' : 'bg-border'
                    }`}
                    style={{ width: '160px' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Basic Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about your restaurant</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Restaurant Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.restaurantName}
                    onChange={(e) => setData({ ...data, restaurantName: e.target.value })}
                    placeholder="e.g., The Bistro"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData({ ...data, location: e.target.value })}
                    placeholder="e.g., 123 Main Street, New York, NY 10001"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.ownerName}
                      onChange={(e) => setData({ ...data, ownerName: e.target.value })}
                      placeholder="e.g., John Smith"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Menu Upload */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Menu Setup</h2>
                <p className="text-sm text-muted-foreground">Upload your menu or provide a link</p>
              </div>

              {/* Menu Type Selector */}
              <div className="flex gap-3">
                <button
                  onClick={() => setData({ ...data, menuType: 'upload' })}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    data.menuType === 'upload'
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card hover:bg-muted'
                  }`}
                >
                  <Upload className={`w-6 h-6 mx-auto mb-2 ${
                    data.menuType === 'upload' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className="text-sm font-medium text-foreground">Upload File</div>
                  <div className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG</div>
                </button>

                <button
                  onClick={() => setData({ ...data, menuType: 'url' })}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    data.menuType === 'url'
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card hover:bg-muted'
                  }`}
                >
                  <LinkIcon className={`w-6 h-6 mx-auto mb-2 ${
                    data.menuType === 'url' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className="text-sm font-medium text-foreground">Menu URL</div>
                  <div className="text-xs text-muted-foreground mt-1">DoorDash/Uber Eats</div>
                </button>
              </div>

              {/* Upload Section */}
              {data.menuType === 'upload' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Upload Menu <span className="text-primary">*</span>
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/50">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="menu-upload"
                    />
                    <label htmlFor="menu-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      {data.menuFile ? (
                        <div>
                          <p className="text-foreground font-medium mb-1">{data.menuFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(data.menuFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-foreground font-medium mb-1">Click to upload menu</p>
                          <p className="text-sm text-muted-foreground">PDF, JPG, or PNG (max 10MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* URL Section */}
              {data.menuType === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Menu URL <span className="text-primary">*</span>
                  </label>
                  <input
                    type="url"
                    value={data.menuUrl}
                    onChange={(e) => setData({ ...data, menuUrl: e.target.value })}
                    placeholder="https://www.doordash.com/restaurant-name or https://yourwebsite.com/menu"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Paste the link to your menu from DoorDash, Uber Eats, your website, or any delivery platform
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Tables & Capacity */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Tables & Capacity</h2>
                <p className="text-sm text-muted-foreground">Tell us about your seating arrangements</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Number of Tables <span className="text-primary">*</span>
                  </label>
                  <input
                    type="number"
                    value={data.tables}
                    onChange={(e) => setData({ ...data, tables: e.target.value })}
                    placeholder="e.g., 15"
                    min="1"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Total number of tables in your restaurant
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Total Seating Capacity <span className="text-primary">*</span>
                  </label>
                  <input
                    type="number"
                    value={data.capacity}
                    onChange={(e) => setData({ ...data, capacity: e.target.value })}
                    placeholder="e.g., 60"
                    min="1"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Maximum number of guests you can accommodate
                  </p>
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-accent rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Restaurant:</span>
                      <span className="text-foreground font-medium">{data.restaurantName || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-foreground font-medium">{data.location || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Menu:</span>
                      <span className="text-foreground font-medium">
                        {data.menuType === 'upload'
                          ? data.menuFile?.name || 'Not uploaded'
                          : data.menuUrl || 'No URL provided'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 text-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pb-4">
          <p>© 2025 MenuOS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}