import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RefreshCw, Video } from "lucide-react";

interface DeviceAVManagementProps {
  stbId: string;
}

const DeviceAVManagement = ({ stbId }: DeviceAVManagementProps) => {
  const [approvalRequested, setApprovalRequested] = useState(false);
  const [remoteViewOpen, setRemoteViewOpen] = useState(false);
  const [hdmiConnected, setHdmiConnected] = useState(true);
  const [osdMessage, setOsdMessage] = useState("");
  const [osdType, setOsdType] = useState("info");

  const deviceInfo = {
    model: "STB-PRO-4K",
    serialNumber: "SN123456789",
    fwVersion: "v3.2.1",
  };

  const edidInfo = {
    resolution: "1920x1080",
    refreshRate: "60Hz",
    colorDepth: "8-bit",
    hdmiVersion: "2.0",
  };

  const handleRequestApproval = () => {
    setApprovalRequested(true);
    // Simulate approval after 2 seconds
    setTimeout(() => {
      setRemoteViewOpen(true);
      setApprovalRequested(false);
    }, 2000);
  };

  const handleSendOSD = () => {
    console.log("Sending OSD:", osdType, osdMessage);
    // Implement OSD send logic
  };

  return (
    <div className="space-y-6">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Approval Request Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Remote View Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click the "Request Approval" button below to request the customer's approval to connect to the remote view source
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={handleRequestApproval}
              disabled={approvalRequested}
            >
              {approvalRequested ? "Waiting for approval..." : "Request Approval"}
            </Button>
          </CardContent>
        </Card>

        {/* HDMI Information Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>HDMI Information</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setHdmiConnected(!hdmiConnected)}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-center py-8 ${
              hdmiConnected ? 'text-green-600' : 'text-red-600'
            }`}>
              <div className="text-4xl mb-2">📺</div>
              <p className="font-semibold">
                {hdmiConnected ? "HDMI Connected" : "HDMI Not Connected"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* STB Animation Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 space-x-4">
              <div className="text-5xl animate-pulse">📺</div>
              <div className="text-5xl animate-pulse animation-delay-200">📺</div>
              <div className="text-5xl animate-pulse animation-delay-400">📺</div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Multiple devices active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* OSD Message Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>OSD Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={osdType} onValueChange={setOsdType}>
              <SelectTrigger>
                <SelectValue placeholder="Message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter OSD message"
              value={osdMessage}
              onChange={(e) => setOsdMessage(e.target.value)}
            />
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={handleSendOSD}
            >
              Send to Box
            </Button>
          </CardContent>
        </Card>

        {/* EDID Information Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>EDID Information</CardTitle>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution</span>
                <span className="font-medium">{edidInfo.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refresh Rate</span>
                <span className="font-medium">{edidInfo.refreshRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color Depth</span>
                <span className="font-medium">{edidInfo.colorDepth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">HDMI Version</span>
                <span className="font-medium">{edidInfo.hdmiVersion}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Info Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">STB ID</span>
                <span className="font-medium">{stbId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model</span>
                <span className="font-medium">{deviceInfo.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serial Number</span>
                <span className="font-medium">{deviceInfo.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">FW Version</span>
                <span className="font-medium">{deviceInfo.fwVersion}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Remote View Dialog */}
      <Dialog open={remoteViewOpen} onOpenChange={setRemoteViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Remote View - {stbId}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <Video className="h-16 w-16 mx-auto text-primary animate-pulse" />
              <p className="text-lg font-medium">Remote view stream would appear here</p>
              <p className="text-sm text-muted-foreground">
                Streaming via MQTT protocol → Server → WebSocket → Client
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceAVManagement;
