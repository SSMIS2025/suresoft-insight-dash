import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, FileSpreadsheet, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import DeviceDetails from "@/components/devices/DeviceDetails";
import DeviceSearch from "@/components/devices/DeviceSearch";

// Mock data
const generateMockDevices = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `STB${String(i + 1).padStart(6, '0')}`,
    deviceId: `DEV${String(i + 1).padStart(6, '0')}`,
    province: ['Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Karnataka'][i % 4],
    cityTown: ['Chennai', 'Kochi', 'Hyderabad', 'Bangalore'][i % 4],
    casActivation: Math.random() > 0.5 ? 'Active' : 'Inactive',
    model: ['Model A', 'Model B', 'Model C'][i % 3],
    fwVersion: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    metaDataVersion: `v${Math.floor(Math.random() * 3) + 1}.0`,
    customerId: `CUST${String(i + 1).padStart(5, '0')}`,
    retailer: ['Retailer A', 'Retailer B', 'Retailer C'][i % 3],
    manufacturer: ['Manufacturer X', 'Manufacturer Y'][i % 2],
    locationIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
  }));
};

const Devices = () => {
  const [devices] = useState(generateMockDevices(500));
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchFilters, setSearchFilters] = useState({});

  const filteredDevices = devices.filter((device) => {
    if (Object.keys(searchFilters).length === 0) return true;
    // Apply search filters logic here
    return true;
  });

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedDevices.map(d => d.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages.map((page, idx) => (
      page === '...' ? (
        <span key={`ellipsis-${idx}`} className="px-3 py-1">...</span>
      ) : (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(page as number)}
          className="min-w-[2.5rem]"
        >
          {page}
        </Button>
      )
    ));
  };

  if (selectedDevice) {
    return <DeviceDetails stbId={selectedDevice} onBack={() => setSelectedDevice(null)} />;
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 rounded-xl border-2 border-primary/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Device Management
        </h1>
        <p className="text-muted-foreground mt-2">Monitor and manage all connected devices</p>
      </div>

      {searchOpen && (
        <DeviceSearch 
          onClose={() => setSearchOpen(false)} 
          onSearch={(filters) => setSearchFilters(filters)}
        />
      )}

      <div className="bg-card rounded-xl border-2 border-primary/30 shadow-lg overflow-hidden">
        {/* Table Top Bar */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex gap-6 text-sm">
            <span className="font-semibold">Total: <span className="text-primary">{filteredDevices.length}</span></span>
            <span className="font-semibold">Searched: <span className="text-secondary">{filteredDevices.length}</span></span>
            <span className="font-semibold">Selected: <span className="text-accent">{selectedRows.length}</span></span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-primary/10 to-accent/10">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedRows.length === paginatedDevices.length && paginatedDevices.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-12">
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>STB ID</TableHead>
                <TableHead>Device ID</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>City/Town</TableHead>
                <TableHead>CAS Activation</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>FW Version</TableHead>
                <TableHead>Meta Data Version</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Retailer</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Location IP</TableHead>
                <TableHead>Last Seen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDevices.map((device) => (
                <TableRow 
                  key={device.id}
                  className="hover:bg-primary/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedRows.includes(device.id)}
                      onCheckedChange={(checked) => handleSelectRow(device.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="font-medium text-primary">{device.id}</TableCell>
                  <TableCell>{device.deviceId}</TableCell>
                  <TableCell>{device.province}</TableCell>
                  <TableCell>{device.cityTown}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      device.casActivation === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {device.casActivation}
                    </span>
                  </TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{device.fwVersion}</TableCell>
                  <TableCell>{device.metaDataVersion}</TableCell>
                  <TableCell>{device.customerId}</TableCell>
                  <TableCell>{device.retailer}</TableCell>
                  <TableCell>{device.manufacturer}</TableCell>
                  <TableCell>{device.locationIP}</TableCell>
                  <TableCell className="text-xs">{device.lastSeen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <Select value={itemsPerPage.toString()} onValueChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">per page</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {renderPaginationNumbers()}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm">Go to:</span>
              <Input
                type="number"
                min={1}
                max={totalPages}
                className="w-16"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = Number((e.target as HTMLInputElement).value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
