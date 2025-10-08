import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical } from "lucide-react";

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
    frequency: "12.5 GHz",
    symbolRate: "27500 Ks/s",
    polarization: "Horizontal",
    modulation: "DVB-S2",
    cpuUsage: 45,
    cpuTemp: 58,
    memoryUsage: 62,
    storageUsage: 38,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Device Image */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Device Overview</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Serial: {deviceInfo.serialNumber}</p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <div className="text-6xl">📺</div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Model</p>
              <p className="font-medium">{deviceInfo.model}</p>
            </div>
            <div>
              <p className="text-muted-foreground">IP Address</p>
              <p className="font-medium">{deviceInfo.ipAddress}</p>
            </div>
            <div>
              <p className="text-muted-foreground">STB ID</p>
              <p className="font-medium">{stbId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">MAC Address</p>
              <p className="font-medium">{deviceInfo.macAddress}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Subnet Mask</p>
              <p className="font-medium">{deviceInfo.subnetMask}</p>
            </div>
            <div>
              <p className="text-muted-foreground">FW Version</p>
              <p className="font-medium">{deviceInfo.fwVersion}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Gateway</p>
              <p className="font-medium">{deviceInfo.gateway}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Bouquet</p>
              <p className="font-medium">{deviceInfo.bouquet}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Virtual ID</p>
              <p className="font-medium">{deviceInfo.virtualId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Customer ID</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{deviceInfo.customerId}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Retailer</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{deviceInfo.retailer}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Device Name</p>
              <p className="font-medium">{deviceInfo.deviceName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Processor</p>
              <p className="font-medium">{deviceInfo.processor}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Installed RAM</p>
              <p className="font-medium">{deviceInfo.installedRam}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Device ID</p>
              <p className="font-medium">{deviceInfo.deviceId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Product ID</p>
              <p className="font-medium">{deviceInfo.productId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">System Type</p>
              <p className="font-medium">{deviceInfo.systemType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-sm font-medium text-primary">{deviceInfo.cpuUsage}%</span>
            </div>
            <Progress value={deviceInfo.cpuUsage} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">CPU Temperature</span>
              <span className="text-sm font-medium text-orange-500">{deviceInfo.cpuTemp}°C</span>
            </div>
            <Progress value={(deviceInfo.cpuTemp / 100) * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-sm font-medium text-secondary">{deviceInfo.memoryUsage}%</span>
            </div>
            <Progress value={deviceInfo.memoryUsage} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Storage Usage</span>
              <span className="text-sm font-medium text-accent">{deviceInfo.storageUsage}%</span>
            </div>
            <Progress value={deviceInfo.storageUsage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Signal Info */}
      <Card className="border-2 border-primary/20 lg:col-span-2">
        <CardHeader>
          <CardTitle>Signal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Frequency</p>
              <p className="font-medium text-lg">{deviceInfo.frequency}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Symbol Rate</p>
              <p className="font-medium text-lg">{deviceInfo.symbolRate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Polarization</p>
              <p className="font-medium text-lg">{deviceInfo.polarization}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Modulation</p>
              <p className="font-medium text-lg">{deviceInfo.modulation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceGeneral;
