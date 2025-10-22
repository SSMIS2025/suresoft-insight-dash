import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Cpu, MemoryStick, HardDrive, Thermometer, Clock, Radio, Activity } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import device1 from "@/assets/device-1.jpg";
import device2 from "@/assets/device-2.jpg";
import device3 from "@/assets/device-3.jpg";
import device4 from "@/assets/device-4.jpg";

interface DeviceGeneralProps {
  stbId: string;
}

const DeviceGeneral = ({ stbId }: DeviceGeneralProps) => {
  // Mock data
  const deviceInfo = {
    model: "STB-PRO-4K",
    ipAddress: "192.168.1.100",
    macAddress: "00:1A:2B:3C:4D:5E",
    subnetMask: "255.255.255.0",
    fwVersion: "v3.2.1",
    gateway: "192.168.1.1",
    bouquet: "Premium HD",
    virtualId: "VID12345",
    customerId: "CUST00123",
    retailer: "Retailer A",
    deviceName: "Living Room STB",
    processor: "Quad-core ARM",
    installedRam: "2GB DDR3",
    deviceId: "DEV000123",
    productId: "PROD-STB-001",
    systemType: "Android TV",
    serialNumber: "SN123456789",
    cpu: 45,
    temperature: 58,
    memory: 62,
    storage: 38,
    signal: {
      frequency: "12.5 GHz",
      symbolRate: "27500 Ks/s",
      polarization: "Horizontal",
      modulation: "DVB-S2",
    },
  };

  const deviceImages = [device1, device2, device3, device4];

  const getPerformanceColor = (value: number) => {
    if (value >= 80) return "hsl(var(--destructive))";
    if (value >= 60) return "hsl(var(--warning))";
    return "hsl(var(--success))";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Device Overview */}
        <Card className="hover-scale border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Device Overview</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Serial: {deviceInfo.serialNumber}</p>
          </CardHeader>
          <CardContent>
            <ImageCarousel 
              images={deviceImages} 
              autoSlide={true} 
              slideInterval={3000}
              className="h-48"
            />
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="hover-scale border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">{deviceInfo.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IP Address</span>
              <span className="font-medium">{deviceInfo.ipAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">STB ID</span>
              <span className="font-medium">{stbId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MAC Address</span>
              <span className="font-medium">{deviceInfo.macAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subnet Mask</span>
              <span className="font-medium">{deviceInfo.subnetMask}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">FW Version</span>
              <span className="font-medium">{deviceInfo.fwVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gateway</span>
              <span className="font-medium">{deviceInfo.gateway}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bouquet</span>
              <span className="font-medium">{deviceInfo.bouquet}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Virtual ID</span>
              <span className="font-medium">{deviceInfo.virtualId}</span>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="hover-scale border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Customer ID</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{deviceInfo.customerId}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Retailer</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{deviceInfo.retailer}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Device Name</span>
              <span className="font-medium">{deviceInfo.deviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processor</span>
              <span className="font-medium">{deviceInfo.processor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Installed RAM</span>
              <span className="font-medium">{deviceInfo.installedRam}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Device ID</span>
              <span className="font-medium">{deviceInfo.deviceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product ID</span>
              <span className="font-medium">{deviceInfo.productId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">System Type</span>
              <span className="font-medium">{deviceInfo.systemType}</span>
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="col-span-full hover-scale border-2 border-primary/20">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CPU Usage */}
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="relative">
                  <Cpu className="h-12 w-12" style={{ color: getPerformanceColor(deviceInfo.cpu) }} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-lg font-bold" style={{ color: getPerformanceColor(deviceInfo.cpu) }}>
                      {deviceInfo.cpu}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${deviceInfo.cpu}%`,
                        backgroundColor: getPerformanceColor(deviceInfo.cpu)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* CPU Temperature */}
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="relative">
                  <Thermometer className="h-12 w-12" style={{ color: getPerformanceColor((deviceInfo.temperature / 100) * 100) }} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Temperature</span>
                    <span className="text-lg font-bold" style={{ color: getPerformanceColor((deviceInfo.temperature / 100) * 100) }}>
                      {deviceInfo.temperature}°C
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${(deviceInfo.temperature / 100) * 100}%`,
                        backgroundColor: getPerformanceColor((deviceInfo.temperature / 100) * 100)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Memory Usage */}
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="relative">
                  <MemoryStick className="h-12 w-12" style={{ color: getPerformanceColor(deviceInfo.memory) }} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-lg font-bold" style={{ color: getPerformanceColor(deviceInfo.memory) }}>
                      {deviceInfo.memory}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${deviceInfo.memory}%`,
                        backgroundColor: getPerformanceColor(deviceInfo.memory)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Storage Usage */}
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="relative">
                  <HardDrive className="h-12 w-12" style={{ color: getPerformanceColor(deviceInfo.storage) }} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-lg font-bold" style={{ color: getPerformanceColor(deviceInfo.storage) }}>
                      {deviceInfo.storage}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${deviceInfo.storage}%`,
                        backgroundColor: getPerformanceColor(deviceInfo.storage)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signal Information */}
        <Card className="hover-scale border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-primary" />
              Signal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium">{deviceInfo.signal.frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Symbol Rate</span>
              <span className="font-medium">{deviceInfo.signal.symbolRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Polarization</span>
              <span className="font-medium">{deviceInfo.signal.polarization}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modulation</span>
              <span className="font-medium">{deviceInfo.signal.modulation}</span>
            </div>
          </CardContent>
        </Card>

        {/* NTP Information */}
        <Card className="hover-scale border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              NTP Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">First NTP Server</span>
              <span className="font-medium text-xs">time.google.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Second NTP Server</span>
              <span className="font-medium text-xs">time.windows.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">LNB Type</span>
              <span className="font-medium">Universal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">LNB Frequency</span>
              <span className="font-medium text-xs">9750/10600 MHz</span>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="hover-scale border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Service Status</span>
              <Badge variant="default">Running</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Channel</span>
              <span className="font-medium text-xs">Star Sports HD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SNR</span>
              <span className="font-medium">12.5 dB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ECR</span>
              <span className="font-medium">3.2e-5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SSL</span>
              <span className="font-medium">85 dBμV</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SQl</span>
              <span className="font-medium">92%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceGeneral;
