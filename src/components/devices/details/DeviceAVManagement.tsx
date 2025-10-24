import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RefreshCw, Video } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import device1 from "@/assets/device-1.jpg";
import device2 from "@/assets/device-2.jpg";
import device3 from "@/assets/device-3.jpg";
import device4 from "@/assets/device-4.jpg";

interface DeviceAVManagementProps {
  stbId: string;
}

const DeviceAVManagement = ({ stbId }: DeviceAVManagementProps) => {
  const [approvalRequested, setApprovalRequested] = useState(false);
  const [remoteViewOpen, setRemoteViewOpen] = useState(false);
  const [hdmiConnected, setHdmiConnected] = useState(false);
  const [osdMessage, setOsdMessage] = useState("");
  const [osdType, setOsdType] = useState("info");
  const [timeRemaining, setTimeRemaining] = useState(60);

  const deviceImages = [device1, device2, device3, device4];

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
    if (!hdmiConnected) {
      return;
    }
    setApprovalRequested(true);
    setTimeRemaining(60);
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setApprovalRequested(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Simulate approval after 5 seconds
    setTimeout(() => {
      clearInterval(countdownInterval);
      setRemoteViewOpen(true);
      setApprovalRequested(false);
      setTimeRemaining(60);
    }, 5000);
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
            <p className="text-sm text-muted-foreground mb-2">
              {hdmiConnected 
                ? "Click the \"Request Approval\" button below to request the customer's approval to connect to the remote view source"
                : "HDMI must be connected before requesting approval. Click the refresh button on HDMI Information card to connect."}
            </p>
            {approvalRequested && (
              <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="text-center">
                  <p className="text-sm font-medium mb-2">Waiting for customer approval...</p>
                  <div className="text-3xl font-bold text-primary">{timeRemaining}s</div>
                </div>
              </div>
            )}
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary disabled:opacity-50"
              onClick={handleRequestApproval}
              disabled={approvalRequested || !hdmiConnected}
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
                className="hover-scale"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6 gap-4">
              {/* STB Icon */}
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="currentColor">
                  <rect x="8" y="24" width="48" height="24" rx="2" />
                  <rect x="20" y="28" width="8" height="4" fill="hsl(var(--background))" />
                  <circle cx="38" cy="36" r="2" fill="hsl(var(--background))" />
                  <circle cx="44" cy="36" r="2" fill="hsl(var(--background))" />
                  <rect x="12" y="48" width="40" height="2" />
                </svg>
                <p className="text-xs mt-2 font-medium">STB</p>
              </div>

              {/* Connection Line with Status */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-1 bg-muted"></div>
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                    hdmiConnected ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {hdmiConnected ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className={`text-xs mt-6 font-semibold ${
                  hdmiConnected ? 'text-green-600' : 'text-red-600'
                }`}>
                  {hdmiConnected ? "HDMI is Connected" : "HDMI Not Connected"}
                </p>
              </div>

              {/* Computer Icon */}
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-secondary" viewBox="0 0 64 64" fill="currentColor">
                  <rect x="8" y="12" width="48" height="32" rx="2" />
                  <rect x="12" y="16" width="40" height="24" fill="hsl(var(--background))" />
                  <rect x="20" y="44" width="24" height="2" />
                  <rect x="16" y="46" width="32" height="4" rx="1" />
                </svg>
                <p className="text-xs mt-2 font-medium">Display</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Images Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Device Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageCarousel 
              images={deviceImages} 
              autoSlide={true} 
              slideInterval={4000}
              className="h-40"
            />
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
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Remote View - {stbId}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Stream - Left Side */}
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border-2 border-primary/20">
                <div className="text-center space-y-4">
                  <Video className="h-16 w-16 mx-auto text-primary animate-pulse" />
                  <p className="text-lg font-medium">Remote view stream would appear here</p>
                  <p className="text-sm text-muted-foreground">
                    Streaming via MQTT protocol → Server → WebSocket → Client
                  </p>
                </div>
              </div>
            </div>

            {/* RCU Control - Right Side */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-card to-primary/5 p-6 rounded-2xl border-2 border-primary/30 shadow-lg">
                <h3 className="text-center font-semibold mb-4 text-primary">Remote Control Unit</h3>
                
                {/* RCU Design */}
                <div className="w-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl">
                  {/* Power Button */}
                  <div className="flex justify-center mb-6">
                    <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div></div>
                    <button className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-white font-bold">
                      ▲
                    </button>
                    <div></div>
                    <button className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-white font-bold">
                      ◄
                    </button>
                    <button className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center text-white text-xs font-semibold">
                      OK
                    </button>
                    <button className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-white font-bold">
                      ►
                    </button>
                    <div></div>
                    <button className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-white font-bold">
                      ▼
                    </button>
                    <div></div>
                  </div>

                  {/* Volume and Channel Buttons */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <button className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-sm font-semibold">
                        VOL +
                      </button>
                      <button className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-sm font-semibold">
                        VOL -
                      </button>
                    </div>
                    <div className="space-y-2">
                      <button className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-sm font-semibold">
                        CH +
                      </button>
                      <button className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-sm font-semibold">
                        CH -
                      </button>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <button className="py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-xs">
                      ⏮
                    </button>
                    <button className="py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-xs">
                      ⏸
                    </button>
                    <button className="py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors text-white text-xs">
                      ▶
                    </button>
                    <button className="py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-xs">
                      ⏭
                    </button>
                  </div>

                  {/* Color Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    <button className="h-8 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"></button>
                    <button className="h-8 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"></button>
                    <button className="h-8 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors"></button>
                    <button className="h-8 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceAVManagement;
