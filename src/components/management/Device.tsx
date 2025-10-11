import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FileSpreadsheet, Search, Trash2, Upload, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data
const mockAllDevices = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Inactive" : "Pending",
  stbId: `STB${1000 + i}`,
  deviceId: `DEV${2000 + i}`,
  macAddress: `AA:BB:CC:DD:EE:${i.toString(16).padStart(2, '0').toUpperCase()}`,
  model: `Model-${i % 5 + 1}`,
  fwVersion: `v${i % 3 + 1}.${i % 10}.0`,
  customer: `Customer ${i + 1}`,
  retailer: `Retailer ${i % 10 + 1}`,
  manufacturer: i % 2 === 0 ? "Manufacturer A" : "Manufacturer B",
  dateAdded: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Sep25`,
  dateDeployed: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25`,
}));

const mockBulkHistory = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  fileName: `devices_batch_${i + 1}.csv`,
  result: i % 3 === 0 ? "Success" : i % 3 === 1 ? "Partial" : "Failed",
  totalRecords: Math.floor(Math.random() * 500) + 100,
  added: Math.floor(Math.random() * 400) + 50,
  updated: Math.floor(Math.random() * 100) + 10,
  invalidData: Math.floor(Math.random() * 20),
  uploadUser: `user${i + 1}@example.com`,
  importedDate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25`,
}));

const Device = () => {
  const [activeTab, setActiveTab] = useState("all-devices");
  const [showImportModal, setShowImportModal] = useState(false);
  const [fileFormat, setFileFormat] = useState("csv");

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all-devices">All Devices</TabsTrigger>
          <TabsTrigger value="deployed">Deployed</TabsTrigger>
          <TabsTrigger value="bulk-history">Bulk Upload History</TabsTrigger>
        </TabsList>

        <TabsContent value="all-devices">
          <DeviceTable data={mockAllDevices} type="all" />
        </TabsContent>

        <TabsContent value="deployed">
          <DeviceTable data={mockAllDevices} type="deployed" onImportClick={() => setShowImportModal(true)} />
        </TabsContent>

        <TabsContent value="bulk-history">
          <BulkHistoryTable data={mockBulkHistory} />
        </TabsContent>
      </Tabs>

      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Deployed Devices</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>File Format</Label>
              <RadioGroup value={fileFormat} onValueChange={setFileFormat}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv">CSV (UTF-8 Only)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Excel Template</Label>
              <Button variant="outline" size="sm">Download</Button>
            </div>
            <div className="space-y-2">
              <Label>Upload File</Label>
              <Input type="file" accept=".csv" />
            </div>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">250</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">200</div>
                  <div className="text-xs text-muted-foreground">Ready</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">30</div>
                  <div className="text-xs text-muted-foreground">Conflict</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">20</div>
                  <div className="text-xs text-muted-foreground">Invalid</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportModal(false)}>Cancel</Button>
            <Button onClick={() => setShowImportModal(false)}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DeviceTable = ({ data, type, onImportClick }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchTerm ? data.filter((item: any) => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  ) : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6">
          <div>
            <span className="text-sm text-muted-foreground">Total: </span>
            <span className="font-semibold">{data.length}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Searched: </span>
            <span className="font-semibold">{filteredData.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
          {type === "deployed" && (
            <>
              <Button variant="outline" size="icon" onClick={onImportClick}>
                <Upload className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="outline" size="icon" onClick={() => setShowSearch(!showSearch)}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="mb-4">
          <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {type === "all" && <TableHead>Status</TableHead>}
              <TableHead>STB ID</TableHead>
              <TableHead>Device ID</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>FW Version</TableHead>
              {type === "all" && <TableHead>Customer</TableHead>}
              {type === "deployed" && <TableHead>Customer ID</TableHead>}
              <TableHead>Retailer</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Date Deployed</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item: any) => (
              <TableRow key={item.id}>
                {type === "all" && (
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === "Active" ? "bg-green-100 text-green-700" :
                      item.status === "Inactive" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                )}
                <TableCell>{item.stbId}</TableCell>
                <TableCell>{item.deviceId}</TableCell>
                <TableCell>{item.macAddress}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.fwVersion}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.retailer}</TableCell>
                <TableCell>{item.manufacturer}</TableCell>
                <TableCell>{item.dateAdded}</TableCell>
                <TableCell>{item.dateDeployed}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          {getPageNumbers().map((page, idx) => (
            page === "..." ? (
              <span key={idx} className="px-2">...</span>
            ) : (
              <Button key={idx} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page as number)}>
                {page}
              </Button>
            )
          ))}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            Next
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">Go to:</span>
            <Input type="number" className="w-16" min={1} max={totalPages} onChange={(e) => { const p = Number(e.target.value); if (p >= 1 && p <= totalPages) setCurrentPage(p); }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

const BulkHistoryTable = ({ data }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchTerm ? data.filter((item: any) => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  ) : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6">
          <div>
            <span className="text-sm text-muted-foreground">Total: </span>
            <span className="font-semibold">{data.length}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Searched: </span>
            <span className="font-semibold">{filteredData.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowSearch(!showSearch)}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="mb-4">
          <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Total Records</TableHead>
              <TableHead>Added</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Invalid Data</TableHead>
              <TableHead>Upload User</TableHead>
              <TableHead>Imported Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.fileName}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.result === "Success" ? "bg-green-100 text-green-700" :
                    item.result === "Partial" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {item.result}
                  </span>
                </TableCell>
                <TableCell>{item.totalRecords}</TableCell>
                <TableCell>{item.added}</TableCell>
                <TableCell>{item.updated}</TableCell>
                <TableCell>{item.invalidData}</TableCell>
                <TableCell>{item.uploadUser}</TableCell>
                <TableCell>{item.importedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          {getPageNumbers().map((page, idx) => (
            page === "..." ? (
              <span key={idx} className="px-2">...</span>
            ) : (
              <Button key={idx} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page as number)}>
                {page}
              </Button>
            )
          ))}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            Next
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">Go to:</span>
            <Input type="number" className="w-16" min={1} max={totalPages} onChange={(e) => { const p = Number(e.target.value); if (p >= 1 && p <= totalPages) setCurrentPage(p); }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Device;
