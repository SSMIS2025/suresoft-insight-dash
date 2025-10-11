import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileSpreadsheet, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockData = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  stbId: `STB${3000 + i}`,
  deviceId: `DEV${4000 + i}`,
  province: `Province ${i % 10 + 1}`,
  cityTown: `City ${i % 15 + 1}`,
  casActivation: i % 2 === 0 ? "Activated" : "Not Activated",
  model: `Model-${i % 5 + 1}`,
  fwVersion: `v${i % 3 + 1}.${i % 10}.0`,
  metaDataVersion: `v${i % 2 + 1}.${i % 5}.0`,
  customerId: `CUST${5000 + i}`,
  locationIp: `192.168.${Math.floor(i / 255)}.${i % 255}`,
  lastAccessTime: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
}));

const OutsideIndiaDevice = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchTerm ? mockData.filter((item) => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  ) : mockData;

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
            <span className="font-semibold">{mockData.length}</span>
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

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STB ID</TableHead>
              <TableHead>Device ID</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>City/Town</TableHead>
              <TableHead>CAS Activation</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>FW Version</TableHead>
              <TableHead>Meta Data Version</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Location IP</TableHead>
              <TableHead>Last Access Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.stbId}</TableCell>
                <TableCell>{item.deviceId}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.cityTown}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.casActivation === "Activated" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {item.casActivation}
                  </span>
                </TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.fwVersion}</TableCell>
                <TableCell>{item.metaDataVersion}</TableCell>
                <TableCell>{item.customerId}</TableCell>
                <TableCell>{item.locationIp}</TableCell>
                <TableCell>{item.lastAccessTime}</TableCell>
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

export default OutsideIndiaDevice;
