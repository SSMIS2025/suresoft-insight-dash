import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
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

  const actions: DeviceAction[] = [
    {
      action: "Restart Device",
      performedBy: "Admin User",
      deviceId: "DEV-12345",
      result: "Success",
      datePerformed: "2024-01-20 10:30:00",
      dateCompleted: "2024-01-20 10:31:00",
    },
    {
      action: "Update Firmware",
      performedBy: "System Admin",
      deviceId: "DEV-12346",
      result: "Success",
      datePerformed: "2024-01-20 09:15:00",
      dateCompleted: "2024-01-20 09:25:00",
    },
    {
      action: "Factory Reset",
      performedBy: "Tech Support",
      deviceId: "DEV-12347",
      result: "Failed",
      datePerformed: "2024-01-19 14:20:00",
      dateCompleted: "2024-01-19 14:21:00",
    },
    {
      action: "Network Configuration",
      performedBy: "Network Admin",
      deviceId: "DEV-12348",
      result: "Success",
      datePerformed: "2024-01-19 11:00:00",
      dateCompleted: "2024-01-19 11:05:00",
    },
  ];

  const filteredActions = actions.filter(
    (action) =>
      action.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {filteredActions.map((action, index) => (
                <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
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
      </CardContent>
    </Card>
  );
};

export default DeviceActionHistory;
