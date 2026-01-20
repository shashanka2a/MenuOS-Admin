import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Plus, Grid3x3, List, Search, MoreVertical, X, Image as ImageIcon, Edit, Trash2, Eye, Copy } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  status: 'available' | 'low-stock' | 'unavailable';
  image: string;
}

export function MenuManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'All Items', count: 48 },
    { id: 'pizzas', name: 'Pizzas', count: 12 },
    { id: 'pasta', name: 'Pasta', count: 10 },
    { id: 'salads', name: 'Salads', count: 8 },
    { id: 'desserts', name: 'Desserts', count: 7 },
    { id: 'beverages', name: 'Beverages', count: 11 },
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil',
      price: '$14.00',
      category: 'Pizzas',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1664309641932-0e03e0771b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBmb29kfGVufDF8fHx8MTc2NTIxMDA2OXww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 2,
      name: 'Spaghetti Carbonara',
      description: 'Eggs, Pecorino Romano, guanciale, black pepper',
      price: '$14.00',
      category: 'Pasta',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1574885014162-92e4f12928db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBjYXJib25hcmElMjBwYXN0YXxlbnwxfHx8fDE3NjUyMDc3MjR8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Romaine lettuce, croutons, parmesan, Caesar dressing',
      price: '$12.00',
      category: 'Salads',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1739436776460-35f309e3f887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc2NTE4MzQ1OHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 4,
      name: 'Tiramisu',
      description: 'Coffee-soaked ladyfingers, mascarpone cream',
      price: '$8.00',
      category: 'Desserts',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzY1MjAxMTYwfDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 5,
      name: 'Quattro Formaggi',
      description: 'Four cheese pizza: mozzarella, gorgonzola, parmesan, fontina',
      price: '$16.00',
      category: 'Pizzas',
      status: 'low-stock',
      image: 'https://images.unsplash.com/photo-1672939553298-fbec039867a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWF0dHJvJTIwZm9ybWFnZ2klMjBwaXp6YXxlbnwxfHx8fDE3NjUyMTAwNzB8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 6,
      name: 'Lasagna',
      description: 'Layered pasta with beef ragù and béchamel',
      price: '$18.00',
      category: 'Pasta',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1560035285-64808ba47bda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwaXRhbGlhbiUyMGZvb2R8ZW58MXx8fHwxNzY1MjEwMDcxfDA&ixlib=rb-4.1.0&q=80&w=400',
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  const handleDuplicate = (item: MenuItem) => {
    const newItem = { ...item, id: Date.now(), name: `${item.name} (Copy)` };
    setMenuItems([...menuItems, newItem]);
    setOpenMenuId(null);
  };

  const handleDelete = (itemId: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
      setOpenMenuId(null);
    }
  };

  const handleSaveItem = (item: MenuItem) => {
    setMenuItems(menuItems.map(m => m.id === item.id ? item : m));
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const ItemDropdownMenu = ({ item }: { item: MenuItem }) => (
    <div className="absolute right-0 top-8 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-20">
      <button
        onClick={() => handleEdit(item)}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm text-foreground"
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>
      <button
        onClick={() => handleDuplicate(item)}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm text-foreground"
      >
        <Copy className="w-4 h-4" />
        Duplicate
      </button>
      <button
        onClick={() => setOpenMenuId(null)}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm text-foreground"
      >
        <Eye className="w-4 h-4" />
        View Details
      </button>
      <div className="border-t border-border my-1" />
      <button
        onClick={() => handleDelete(item.id)}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-destructive/10 text-sm text-destructive"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );

  const EditModal = ({ item, onSave, onClose }: { item: MenuItem; onSave: (item: MenuItem) => void; onClose: () => void }) => {
    const [editedItem, setEditedItem] = useState(item);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Edit Menu Item</h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Item Image</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 relative">
                  <Image
                    src={editedItem.image}
                    alt={editedItem.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                  <ImageIcon className="w-4 h-4" />
                  Change Image
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={editedItem.name}
                  onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                <input
                  type="text"
                  value={editedItem.price}
                  onChange={(e) => setEditedItem({ ...editedItem, price: e.target.value })}
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                rows={3}
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={editedItem.category}
                  onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                >
                  <option>Pizzas</option>
                  <option>Pasta</option>
                  <option>Salads</option>
                  <option>Desserts</option>
                  <option>Beverages</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={editedItem.status}
                  onChange={(e) => setEditedItem({ ...editedItem, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                >
                  <option value="available">Available</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editedItem)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-foreground mb-1">Menu Management</h1>
          <p className="text-muted-foreground">Manage your menu items, categories, and availability</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Upload PDF</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Item</span>
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="w-60 flex-shrink-0">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-4 flex items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Items Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="relative" ref={menuRef}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === item.id ? null : item.id);
                          }}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {openMenuId === item.id && <ItemDropdownMenu item={item} />}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{item.price}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'available'
                            ? 'bg-[#DCFCE7] text-[#166534] dark:bg-[#166534]/20 dark:text-[#86EFAC]'
                            : item.status === 'low-stock'
                            ? 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#92400E]/20 dark:text-[#FDE047]'
                            : 'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#991B1B]/20 dark:text-[#FCA5A5]'
                        }`}
                      >
                        {item.status === 'available' ? 'Available' : item.status === 'low-stock' ? 'Low Stock' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Item
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {menuItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleEdit(item)}
                      className="hover:bg-muted transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium text-foreground text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{item.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === 'available'
                              ? 'bg-[#DCFCE7] text-[#166534] dark:bg-[#166534]/20 dark:text-[#86EFAC]'
                              : item.status === 'low-stock'
                              ? 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#92400E]/20 dark:text-[#FDE047]'
                              : 'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#991B1B]/20 dark:text-[#FCA5A5]'
                          }`}
                        >
                          {item.status === 'available' ? 'Available' : item.status === 'low-stock' ? 'Low Stock' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative" ref={menuRef}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === item.id ? null : item.id);
                            }}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                          {openMenuId === item.id && <ItemDropdownMenu item={item} />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <EditModal item={selectedItem} onSave={handleSaveItem} onClose={() => {setShowEditModal(false); setSelectedItem(null);}} />
      )}

      {/* Add Item Modal - Similar structure, omitted for brevity */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Add Menu Item</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground">Add item form would go here...</p>
            </div>
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground">
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium">
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal - Similar structure */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Upload Menu</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium text-foreground mb-1">Upload PDF or Image</p>
                <p className="text-xs text-muted-foreground mb-4">Our AI will extract menu items automatically</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium">
                  Choose File
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
