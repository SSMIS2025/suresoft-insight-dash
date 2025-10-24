import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Download, Upload, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeviceDiagnosticsProps {
  stbId: string;
}

const DeviceDiagnostics = ({ stbId }: DeviceDiagnosticsProps) => {
  const { toast } = useToast();
  const [pingTarget, setPingTarget] = useState("8.8.8.8");
  const [traceRouteTarget, setTraceRouteTarget] = useState("8.8.8.8");
  const [pingResults, setPingResults] = useState<any>(null);
  const [traceRouteResults, setTraceRouteResults] = useState<any[]>([]);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [downloadTesting, setDownloadTesting] = useState(false);
  const [uploadTesting, setUploadTesting] = useState(false);
  const [wifiRunTime, setWifiRunTime] = useState("5");
  const [wifiInterval, setWifiInterval] = useState("1");
  const [wifiCount, setWifiCount] = useState("100");
  const [wifiTesting, setWifiTesting] = useState(false);
  const [wifiResults, setWifiResults] = useState<string>("");

  const startPingTest = async () => {
    toast({ title: "Ping Test", description: "Starting ping test..." });
    // Simulate backend call
    setTimeout(() => {
      setPingResults({
        host: pingTarget,
        avgResponseTime: "12ms",
        maxResponseTime: "18ms",
        minResponseTime: "8ms",
        successRate: "100%"
      });
      toast({ title: "Ping Test Complete", description: "Results updated" });
    }, 1500);
  };

  const startTraceRouteTest = async () => {
    toast({ title: "Trace Route Test", description: "Starting trace route..." });
    setTimeout(() => {
      setTraceRouteResults([
        { host: "192.168.1.1", average: "2ms", time1: "1ms", time2: "2ms", time3: "3ms", errorCode: "" },
        { host: "10.0.0.1", average: "5ms", time1: "4ms", time2: "5ms", time3: "6ms", errorCode: "" },
        { host: traceRouteTarget, average: "12ms", time1: "10ms", time2: "12ms", time3: "14ms", errorCode: "" },
      ]);
      toast({ title: "Trace Route Complete", description: "Results updated" });
    }, 2000);
  };

  const startDownloadTest = () => {
    setDownloadTesting(true);
    setDownloadSpeed(0);
    toast({ title: "Speed Test", description: "Testing download speed..." });
    const interval = setInterval(() => {
      setDownloadSpeed(prev => {
        const newSpeed = prev + Math.random() * 20;
        if (newSpeed >= 85) {
          clearInterval(interval);
          setDownloadTesting(false);
          toast({ title: "Download Test Complete", description: "85 Mbps" });
          return 85;
        }
        return newSpeed;
      });
    }, 100);
  };

  const startUploadTest = () => {
    setUploadTesting(true);
    setUploadSpeed(0);
    toast({ title: "Speed Test", description: "Testing upload speed..." });
    const interval = setInterval(() => {
      setUploadSpeed(prev => {
        const newSpeed = prev + Math.random() * 10;
        if (newSpeed >= 42) {
          clearInterval(interval);
          setUploadTesting(false);
          toast({ title: "Upload Test Complete", description: "42 Mbps" });
          return 42;
        }
        return newSpeed;
      });
    }, 100);
  };

  const startWifiTest = () => {
    setWifiTesting(true);
    toast({ title: "WiFi Signal Test", description: `Running test for ${wifiRunTime} seconds...` });
    setTimeout(() => {
      setWifiResults(`Test completed. Signal strength: Excellent (92%). Samples: ${wifiCount}`);
      setWifiTesting(false);
      toast({ title: "WiFi Test Complete", description: "Signal strength analyzed" });
    }, parseInt(wifiRunTime) * 1000);
  };

  return (
    <div className="space-y-6">
      {/* First Row - Ping and Trace Route */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ping Test */}
        <Card className="border-2 border-primary/20 hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Ping Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Target Host (e.g., 8.8.8.8)"
                value={pingTarget}
                onChange={(e) => setPingTarget(e.target.value)}
                className="flex-1"
              />
              <Button onClick={startPingTest} className="bg-gradient-to-r from-primary to-secondary">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            </div>
            {pingResults && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t animate-fade-in">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Host</p>
                  <p className="font-semibold">{pingResults.host}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="font-semibold text-green-600">{pingResults.successRate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Avg Response Time</p>
                  <p className="font-semibold text-primary">{pingResults.avgResponseTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Max Response Time</p>
                  <p className="font-semibold text-orange-600">{pingResults.maxResponseTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Min Response Time</p>
                  <p className="font-semibold text-green-600">{pingResults.minResponseTime}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trace Route Test */}
        <Card className="border-2 border-primary/20 hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              Trace Route Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Target Host (e.g., 8.8.8.8)"
                value={traceRouteTarget}
                onChange={(e) => setTraceRouteTarget(e.target.value)}
                className="flex-1"
              />
              <Button onClick={startTraceRouteTest} className="bg-gradient-to-r from-secondary to-primary">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            </div>
            {traceRouteResults.length > 0 && (
              <div className="overflow-auto animate-fade-in">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Host</TableHead>
                      <TableHead colSpan={4} className="text-center">Round Trip Time (RTT)</TableHead>
                      <TableHead>Error Code</TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableHead></TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Time 1</TableHead>
                      <TableHead>Time 2</TableHead>
                      <TableHead>Time 3</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {traceRouteResults.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{row.host}</TableCell>
                        <TableCell className="text-primary font-semibold">{row.average}</TableCell>
                        <TableCell>{row.time1}</TableCell>
                        <TableCell>{row.time2}</TableCell>
                        <TableCell>{row.time3}</TableCell>
                        <TableCell>{row.errorCode || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Speed Test */}
      <Card className="border-2 border-primary/20 hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Speed Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Download Speedometer */}
            <div className="space-y-4">
              <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    strokeDasharray={`${(downloadSpeed / 100) * 502} 502`}
                    className="transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Download className="h-8 w-8 text-primary mb-2" />
                  <p className="text-3xl font-bold text-primary">{downloadSpeed.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Mbps</p>
                </div>
              </div>
              <Button
                onClick={startDownloadTest}
                disabled={downloadTesting}
                className="w-full bg-gradient-to-r from-primary to-secondary"
              >
                {downloadTesting ? "Testing..." : "Download Test"}
              </Button>
            </div>

            {/* Upload Speedometer */}
            <div className="space-y-4">
              <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="12"
                    strokeDasharray={`${(uploadSpeed / 100) * 502} 502`}
                    className="transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-secondary mb-2" />
                  <p className="text-3xl font-bold text-secondary">{uploadSpeed.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Mbps</p>
                </div>
              </div>
              <Button
                onClick={startUploadTest}
                disabled={uploadTesting}
                className="w-full bg-gradient-to-r from-secondary to-primary"
              >
                {uploadTesting ? "Testing..." : "Upload Test"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third Row - WiFi Signal Strength Test */}
      <Card className="border-2 border-primary/20 hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            WiFi Signal Strength Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Run Time</label>
              <Select value={wifiRunTime} onValueChange={setWifiRunTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interval (seconds)</label>
              <Select value={wifiInterval} onValueChange={setWifiInterval}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 second</SelectItem>
                  <SelectItem value="2">2 seconds</SelectItem>
                  <SelectItem value="5">5 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sample Count</label>
              <Select value={wifiCount} onValueChange={setWifiCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50 samples</SelectItem>
                  <SelectItem value="100">100 samples</SelectItem>
                  <SelectItem value="200">200 samples</SelectItem>
                  <SelectItem value="500">500 samples</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={startWifiTest}
                disabled={wifiTesting}
                className="w-full bg-gradient-to-r from-primary to-secondary"
              >
                <Play className="h-4 w-4 mr-2" />
                {wifiTesting ? "Testing..." : "Start"}
              </Button>
            </div>
          </div>
          {wifiResults && (
            <div className="p-4 bg-muted rounded-lg animate-fade-in">
              <p className="text-sm font-medium">{wifiResults}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceDiagnostics;
