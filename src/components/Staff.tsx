import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export function Staff() {
  const [showAddModal, setShowAddModal] = useState(false);

  const staffMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Manager',
      phone: '+1 (555) 123-4567',
      pin: '1234',
      status: 'active',
      lastActive: '2m ago',
    },
    {
      id: 2,
      name: 'Mike Williams',
      role: 'Chef',
      phone: '+1 (555) 234-5678',
      pin: '5678',
      status: 'active',
      lastActive: '5m ago',
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Server',
      phone: '+1 (555) 345-6789',
      pin: '9012',
      status: 'active',
      lastActive: '1h ago',
    },
    {
      id: 4,
      name: 'John Smith',
      role: 'Server',
      phone: '+1 (555) 456-7890',
      pin: '3456',
      status: 'active',
      lastActive: '2h ago',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Cashier',
      phone: '+1 (555) 567-8901',
      pin: '7890',
      status: 'inactive',
      lastActive: '2d ago',
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Manager':
        return 'bg-[#FFF4F0] text-[#FF6B35]';
      case 'Chef':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'Server':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      case 'Cashier':
        return 'bg-[#F3E8FF] text-[#6B21A8]';
      default:
        return 'bg-[#F3F4F6] text-[#374151]';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#1E2A3B] mb-1">Staff Management</h1>
          <p className="text-[#6B7280]">Manage your team members and their access</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#ff5520] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Staff</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Total Staff</div>
          <div className="text-2xl font-semibold text-[#1E2A3B]">12</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Active Now</div>
          <div className="text-2xl font-semibold text-[#22C55E]">8</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">On Break</div>
          <div className="text-2xl font-semibold text-[#F59E0B]">2</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Off Duty</div>
          <div className="text-2xl font-semibold text-[#6B7280]">2</div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Phone
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  PIN
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Last Active
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {staff.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <span className="font-medium text-[#1E2A3B] text-sm">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(staff.role)}`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{staff.phone}</td>
                  <td className="px-6 py-4 text-sm font-mono text-[#6B7280]">••••</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        staff.status === 'active'
                          ? 'bg-[#DCFCE7] text-[#166534]'
                          : 'bg-[#F3F4F6] text-[#6B7280]'
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{staff.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-sm text-[#FF6B35] hover:text-[#ff5520] font-medium">Edit</button>
                      <button className="text-sm text-[#EF4444] hover:text-[#DC2626] font-medium">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="font-semibold text-[#1E2A3B]">Add Staff Member</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-[#FAFAFA] rounded">
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Role</label>
                <div className="space-y-2">
                  {['Manager', 'Chef', 'Server', 'Cashier'].map((role) => (
                    <label key={role} className="flex items-center">
                      <input type="radio" name="role" className="mr-2" />
                      <span className="text-sm text-[#6B7280]">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">4-Digit PIN</label>
                <input
                  type="text"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-mono"
                  placeholder="0000"
                />
                <p className="text-xs text-[#6B7280] mt-1">Used for clocking in and order authorization</p>
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-[#6B7280]">Active status</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#FAFAFA] transition-colors text-sm font-medium text-[#1E2A3B]"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium">
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
