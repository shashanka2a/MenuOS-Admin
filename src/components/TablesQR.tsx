import { useState } from 'react';
import { Download, Printer, QrCode, X } from 'lucide-react';

interface Table {
  id: number;
  number: number;
  capacity: number;
}

export function TablesQR() {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [showQRGenerator, setShowQRGenerator] = useState(false);

  const [tables] = useState<Table[]>([
    { id: 1, number: 1, capacity: 2 },
    { id: 2, number: 2, capacity: 2 },
    { id: 3, number: 3, capacity: 4 },
    { id: 4, number: 4, capacity: 4 },
    { id: 5, number: 5, capacity: 6 },
    { id: 6, number: 6, capacity: 6 },
    { id: 7, number: 7, capacity: 2 },
    { id: 8, number: 8, capacity: 4 },
    { id: 9, number: 9, capacity: 4 },
    { id: 10, number: 10, capacity: 8 },
    { id: 11, number: 11, capacity: 2 },
    { id: 12, number: 12, capacity: 2 },
    { id: 13, number: 13, capacity: 4 },
    { id: 14, number: 14, capacity: 4 },
    { id: 15, number: 15, capacity: 6 },
    { id: 16, number: 16, capacity: 2 },
    { id: 17, number: 17, capacity: 2 },
    { id: 18, number: 18, capacity: 4 },
    { id: 19, number: 19, capacity: 8 },
    { id: 20, number: 20, capacity: 4 },
  ]);

  const toggleTableSelection = (tableId: number) => {
    setSelectedTables((prev) =>
      prev.includes(tableId) ? prev.filter((id) => id !== tableId) : [...prev, tableId]
    );
  };

  const selectAllTables = () => {
    if (selectedTables.length === tables.length) {
      setSelectedTables([]);
    } else {
      setSelectedTables(tables.map(t => t.id));
    }
  };

  const handleDownloadQRCodes = () => {
    const tablesToDownload = selectedTables.length > 0 
      ? tables.filter(t => selectedTables.includes(t.id))
      : tables;

    // Create a simple text file as a placeholder for the ZIP
    const qrData = tablesToDownload.map(table => 
      `Table ${table.number}\nURL: https://admin.menuos.app/the-bistro/table/${table.number}\nCapacity: ${table.capacity} guests\n---`
    ).join('\n\n');

    const blob = new Blob([qrData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-codes-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success message
    alert(`Downloaded QR codes for ${tablesToDownload.length} table(s)!\n\nIn production, this would be a ZIP file containing individual QR code images.`);
    setShowQRGenerator(false);
    setSelectedTables([]);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-foreground mb-1">Tables & QR Codes</h1>
          <p className="text-muted-foreground">Manage tables and generate QR codes</p>
        </div>
        <button
          onClick={() => setShowQRGenerator(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors"
        >
          <QrCode className="w-4 h-4" />
          <span className="text-sm font-medium">Generate QR Codes</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Total Tables</div>
          <div className="text-[28px] font-semibold text-foreground">{tables.length}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Total Capacity</div>
          <div className="text-[28px] font-semibold text-foreground">
            {tables.reduce((sum, t) => sum + t.capacity, 0)} guests
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Selected</div>
          <div className="text-[28px] font-semibold text-foreground">
            {selectedTables.length} {selectedTables.length === 1 ? 'table' : 'tables'}
          </div>
        </div>
      </div>

      {/* Tables List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">All Tables</h2>
          <div className="flex gap-3">
            <button
              onClick={selectAllTables}
              className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              {selectedTables.length === tables.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedTables.length > 0 && (
              <button
                onClick={() => setShowQRGenerator(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium"
              >
                <QrCode className="w-4 h-4" />
                Generate QR ({selectedTables.length})
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={selectedTables.length === tables.length}
                    onChange={selectAllTables}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Table Number
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Capacity
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  QR Code
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tables.map((table) => (
                <tr key={table.id} className="hover:bg-muted cursor-pointer transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTables.includes(table.id)}
                      onChange={() => toggleTableSelection(table.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <span className="font-semibold text-primary">{table.number}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">Table {table.number}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {table.capacity} guests
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTables([table.id]);
                        setShowQRGenerator(true);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary hover:bg-accent rounded transition-colors"
                    >
                      <QrCode className="w-3 h-3" />
                      Generate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Generator Modal */}
      {showQRGenerator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Generate QR Codes</h2>
              <button onClick={() => setShowQRGenerator(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tables to generate QR codes for
                </label>
                <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                  {selectedTables.length > 0
                    ? `Selected tables: ${selectedTables.map(id => tables.find(t => t.id === id)?.number).join(', ')} (${selectedTables.length} table${selectedTables.length > 1 ? 's' : ''})`
                    : `All tables (${tables.length} tables)`}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">QR Code Style</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 border-2 border-primary bg-accent rounded-lg text-sm font-medium text-accent-foreground">
                    Standard
                  </button>
                  <button className="p-4 border-2 border-border bg-card rounded-lg text-sm font-medium text-foreground hover:border-primary">
                    With Logo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">QR Code Size</label>
                <select className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                  <option>Small (3&quot; x 3&quot;)</option>
                  <option>Medium (4&quot; x 4&quot;)</option>
                  <option>Large (6&quot; x 6&quot;)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-muted-foreground">Include table number on QR card</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-muted-foreground">Include restaurant name and logo</span>
                </label>
              </div>

              {/* QR Preview */}
              <div className="mt-4 p-6 bg-muted rounded-lg flex flex-col items-center">
                <div className="w-32 h-32 bg-card border-2 border-border rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="w-20 h-20 text-foreground" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">
                    Table {selectedTables.length === 1 ? tables.find(t => t.id === selectedTables[0])?.number : '1-' + tables.length}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">The Bistro</div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setShowQRGenerator(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground">
                <Printer className="w-4 h-4" />
                Print PDF
              </button>
              <button
                onClick={handleDownloadQRCodes}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download ZIP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
