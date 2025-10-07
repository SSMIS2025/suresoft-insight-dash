import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface DeviceAction {
  action: string;
  performedBy: string;
  deviceId: string;
  result: string;
  datePerformed: string;
  dateCompleted: string;
}

const DeviceActionHistory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const itemsPerPage = 10;

  // Generate 100 mock records
  const generateActions = (): DeviceAction[] => {
    const actionTypes = ["Restart Device", "Update Firmware", "Factory Reset", "Network Configuration", "Software Update"];
    const performers = ["Admin User", "System Admin", "Tech Support", "Network Admin", "Supervisor"];
    const results = ["Success", "Failed"];
    
    return Array.from({ length: 100 }, (_, i) => ({
      action: actionTypes[i % actionTypes.length],
      performedBy: performers[i % performers.length],
      deviceId: `DEV-${12345 + i}`,
      result: results[i % 3 === 0 ? 1 : 0],
      datePerformed: `2024-01-${(i % 28) + 1} ${(i % 24).toString().padStart(2, '0')}:${(i % 60).toString().padStart(2, '0')}:00`,
      dateCompleted: `2024-01-${(i % 28) + 1} ${((i % 24) + 1).toString().padStart(2, '0')}:${((i % 60) + 5).toString().padStart(2, '0')}:00`,
    }));
  };

  const actions: DeviceAction[] = generateActions();

  const filteredActions = actions.filter(
    (action) =>
      action.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredActions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActions = filteredActions.slice(startIndex, endIndex);

  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpToPage("");
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredActions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Device Actions");
    XLSX.writeFile(wb, "device_action_history.xlsx");
    
    toast({
      title: "Export Successful",
      description: "Device action history exported to Excel",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Device Action History</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button onClick={exportToExcel}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Action</th>
                <th className="text-left p-3 font-semibold">Performed By</th>
                <th className="text-left p-3 font-semibold">Device ID</th>
                <th className="text-left p-3 font-semibold">Result</th>
                <th className="text-left p-3 font-semibold">Date Performed</th>
                <th className="text-left p-3 font-semibold">Date Completed</th>
              </tr>
            </thead>
            <tbody>
              {currentActions.map((action, index) => (
                <tr key={index} className="border-b hover:bg-primary/5 transition-colors">
                  <td className="p-3 font-medium">{action.action}</td>
                  <td className="p-3">{action.performedBy}</td>
                  <td className="p-3 font-mono text-sm">{action.deviceId}</td>
                  <td className="p-3">
                    <Badge
                      variant={action.result === "Success" ? "default" : "destructive"}
                      className={action.result === "Success" ? "bg-success" : ""}
                    >
                      {action.result}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">{action.datePerformed}</td>
                  <td className="p-3 text-sm">{action.dateCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredActions.length)} of {filteredActions.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-primary/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  placeholder="Jump"
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJumpToPage()}
                  className="w-16 h-8 text-sm border-primary/30"
                  min={1}
                  max={totalPages}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleJumpToPage}
                  className="h-8 border-primary/30"
                >
                  Go
                </Button>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-primary/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceActionHistory;
