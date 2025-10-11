import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileSpreadsheet, Search, Plus, Lock, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockData = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  stbId: `STB${6000 + i}`,
  deviceId: `DEV${7000 + i}`,
  province: `Province ${i % 8 + 1}`,
  cityTown: `City ${i % 12 + 1}`,
  locationIp: `10.0.${Math.floor(i / 255)}.${i % 255}`,
  lastAccessTime: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  fileAccessTime: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
}));

const UnregisteredDevice = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);

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
              <TableHead className="w-12">
                <Checkbox checked={selectedAll} onCheckedChange={(checked) => setSelectedAll(checked === true)} />
              </TableHead>
              <TableHead>STB ID</TableHead>
              <TableHead>Device ID</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>City/Town</TableHead>
              <TableHead>Location IP</TableHead>
              <TableHead>Last Access Time</TableHead>
              <TableHead>File Access Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.stbId}</TableCell>
                <TableCell>{item.deviceId}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.cityTown}</TableCell>
                <TableCell>{item.locationIp}</TableCell>
                <TableCell>{item.lastAccessTime}</TableCell>
                <TableCell>{item.fileAccessTime}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Create">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Lock">
                      <Lock className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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

export default UnregisteredDevice;
