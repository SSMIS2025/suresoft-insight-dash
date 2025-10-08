import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceHistoryProps {
  stbId: string;
}

const DeviceHistory = ({ stbId }: DeviceHistoryProps) => {
  // Mock history data
  const historyData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    action: ['Reboot', 'Firmware Update', 'Channel Scan', 'Factory Reset', 'Pin Reset'][i % 5],
    performedBy: ['Admin User', 'System', 'Support Team', 'Auto Service'][i % 4],
    result: Math.random() > 0.2 ? 'Success' : 'Failed',
    datePerformed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
  }));

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle>Action History for {stbId}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-primary/10 to-accent/10">
                <TableHead>Action</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Date Performed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((record) => (
                <TableRow key={record.id} className="hover:bg-primary/5">
                  <TableCell className="font-medium">{record.action}</TableCell>
                  <TableCell>{record.performedBy}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.result === 'Success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {record.result}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{record.datePerformed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceHistory;
