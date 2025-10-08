import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Play, RefreshCw } from "lucide-react";

interface DeviceDiagnosticsProps {
  stbId: string;
}

const DeviceDiagnostics = ({ stbId }: DeviceDiagnosticsProps) => {
  const [pingTarget, setPingTarget] = useState("8.8.8.8");
  const [speedTestRunning, setSpeedTestRunning] = useState(false);
  const [wifiTestRunning, setWifiTestRunning] = useState(false);
  const [wifiStrength, setWifiStrength] = useState(0);

  const pingResults = {
    host: "8.8.8.8",
    avgResponseTime: "12ms",
    maxResponseTime: "18ms",
    minResponseTime: "8ms",
  };

  const traceRouteData = [
    { hop: 1, status: "Success", avgTime: "2ms", time1: "1ms", time2: "2ms", time3: "3ms" },
    { hop: 2, status: "Success", avgTime: "5ms", time1: "4ms", time2: "5ms", time3: "6ms" },
    { hop: 3, status: "Success", avgTime: "12ms", time1: "10ms", time2: "12ms", time3: "14ms" },
  ];

  const speedTestData = {
    download: 85,
    upload: 42,
  };

  const contentTypes = [
    { type: "Browsing", required: 5, actual: 85, status: "Excellent" },
    { type: "Audio", required: 10, actual: 85, status: "Excellent" },
    { type: "SD Video", required: 25, actual: 85, status: "Good" },
    { type: "HD Video", required: 50, actual: 85, status: "Good" },
    { type: "4K Video", required: 100, actual: 85, status: "Fair" },
  ];

  const startWifiTest = () => {
    setWifiTestRunning(true);
    setWifiStrength(0);
    const interval = setInterval(() => {
      setWifiStrength(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setWifiTestRunning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Ping Test */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Ping Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Target host"
              value={pingTarget}
              onChange={(e) => setPingTarget(e.target.value)}
            />
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Play className="h-4 w-4 mr-2" />
              Test
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Host</p>
              <p className="font-medium">{pingResults.host}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Avg Response Time</p>
              <p className="font-medium text-primary">{pingResults.avgResponseTime}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Max Response Time</p>
              <p className="font-medium text-orange-500">{pingResults.maxResponseTime}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Min Response Time</p>
              <p className="font-medium text-green-500">{pingResults.minResponseTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trace Route */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trace Route Test</CardTitle>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hop</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Time 1</TableHead>
                <TableHead>Time 2</TableHead>
                <TableHead>Time 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traceRouteData.map((row) => (
                <TableRow key={row.hop}>
                  <TableCell>{row.hop}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{row.avgTime}</TableCell>
                  <TableCell>{row.time1}</TableCell>
                  <TableCell>{row.time2}</TableCell>
                  <TableCell>{row.time3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed Test */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Speed Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Download Speed</span>
                  <span className="font-bold text-primary">{speedTestData.download} Mbps</span>
                </div>
                <Progress value={speedTestData.download} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Upload Speed</span>
                  <span className="font-bold text-secondary">{speedTestData.upload} Mbps</span>
                </div>
                <Progress value={speedTestData.upload} className="h-3" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Content Type Performance</h4>
              {contentTypes.map((content) => (
                <div key={content.type} className="flex items-center justify-between text-sm py-1">
                  <span>{content.type}</span>
                  <span className="text-muted-foreground">Required: {content.required} Mbps</span>
                  <span className={`font-medium ${
                    content.status === 'Excellent' ? 'text-green-600' :
                    content.status === 'Good' ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {content.status}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={() => setSpeedTestRunning(true)}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Speed Test
            </Button>
          </CardContent>
        </Card>

        {/* WiFi Signal Strength */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>WiFi Signal Strength</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {wifiStrength}%
                </div>
                <p className="text-muted-foreground">
                  {wifiStrength === 0 ? 'Not tested' :
                   wifiStrength < 30 ? 'Weak signal' :
                   wifiStrength < 70 ? 'Good signal' : 'Excellent signal'}
                </p>
              </div>
            </div>
            <Progress value={wifiStrength} className="h-4" />
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={startWifiTest}
              disabled={wifiTestRunning}
            >
              <Play className="h-4 w-4 mr-2" />
              {wifiTestRunning ? 'Testing... (5 seconds)' : 'Start WiFi Test'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Real-time monitoring for 5 seconds (1000 samples/sec)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceDiagnostics;
