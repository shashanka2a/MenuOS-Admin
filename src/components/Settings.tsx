import { Upload, Save } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your restaurant configuration and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-semibold text-foreground">Profile</h2>
        </div>

        <div className="p-6">
          <div className="max-w-2xl space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Restaurant Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Restaurant Name</label>
                  <input
                    type="text"
                    defaultValue="The Bistro"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted border border-border rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍝</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      Upload Logo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Main Street"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-2 text-foreground"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      defaultValue="New York"
                      placeholder="City"
                      className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    />
                    <input
                      type="text"
                      defaultValue="NY"
                      placeholder="State"
                      className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    />
                    <input
                      type="text"
                      defaultValue="10001"
                      placeholder="ZIP"
                      className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue="https://thebistro.com"
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-border flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors font-medium">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}