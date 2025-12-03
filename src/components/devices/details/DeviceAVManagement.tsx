import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RefreshCw, Video, Maximize2, Minimize2, Move } from "lucide-react";
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 480, height: 270 });
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);

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
    
    setTimeout(() => {
      clearInterval(countdownInterval);
      setRemoteViewOpen(true);
      setApprovalRequested(false);
      setTimeRemaining(60);
    }, 5000);
  };

  const handleSendOSD = () => {
    console.log("Sending OSD:", osdType, osdMessage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = videoSize.width;
    const startHeight = videoSize.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(320, Math.min(960, startWidth + (moveEvent.clientX - startX)));
      const newHeight = Math.max(180, Math.min(540, startHeight + (moveEvent.clientY - startY)));
      setVideoSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setVideoSize({ width: 480, height: 270 });
    } else {
      setVideoSize({ width: 960, height: 540 });
    }
    setIsMaximized(!isMaximized);
  };

  const RCUButton = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <button 
      onClick={onClick}
      className={`transition-all duration-150 active:scale-95 shadow-md hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );

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
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Remote View - {stbId}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            {/* Resizable Video Stream Container */}
            <div className="relative">
              <div 
                ref={resizeRef}
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border-4 border-gray-700 shadow-2xl transition-all duration-300"
                style={{ 
                  width: videoSize.width, 
                  height: videoSize.height,
                }}
              >
                {/* Video Header Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-between px-3 z-10">
                  <span className="text-xs text-gray-300 font-medium">Live Stream</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs text-gray-400">REC</span>
                  </div>
                </div>
                
                {/* Video Content */}
                <div className="absolute inset-0 pt-8 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Video className="h-12 w-12 mx-auto text-primary/60 animate-pulse" />
                    <p className="text-sm font-medium text-gray-300">Remote Stream</p>
                    <p className="text-xs text-gray-500">
                      {videoSize.width} x {videoSize.height}
                    </p>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="absolute top-10 right-2 flex flex-col gap-2">
                  <button 
                    onClick={toggleMaximize}
                    className="p-2 bg-gray-700/80 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {isMaximized ? (
                      <Minimize2 className="h-4 w-4 text-white" />
                    ) : (
                      <Maximize2 className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>

                {/* Resize Handle */}
                <div 
                  onMouseDown={handleMouseDown}
                  className={`absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center bg-gray-600/80 rounded-tl-lg hover:bg-primary/80 transition-colors ${isDragging ? 'bg-primary' : ''}`}
                >
                  <Move className="h-3 w-3 text-white rotate-45" />
                </div>
              </div>
              
              {/* Size Info */}
              <div className="mt-2 text-center text-xs text-muted-foreground">
                Drag corner to resize • Click maximize for full size
              </div>
            </div>

            {/* Realistic RCU */}
            <div className="flex-shrink-0">
              <div className="w-56 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-[2rem] p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-gray-700/50">
                {/* RCU Top Section with IR Window */}
                <div className="flex justify-center mb-3">
                  <div className="w-8 h-2 bg-gradient-to-r from-red-900/50 via-red-600/30 to-red-900/50 rounded-full"></div>
                </div>

                {/* Power Button */}
                <div className="flex justify-center mb-4">
                  <RCUButton className="w-14 h-14 rounded-full bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center ring-2 ring-red-900/50">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" d="M12 3v6"/>
                      <circle cx="12" cy="12" r="8" strokeDasharray="38 12"/>
                    </svg>
                  </RCUButton>
                </div>

                {/* Source & Settings Row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-[10px] font-semibold">
                    SOURCE
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-[10px] font-semibold">
                    STB
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-[10px] font-semibold">
                    TV
                  </RCUButton>
                </div>

                {/* Number Pad */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <RCUButton 
                      key={num}
                      className="w-full h-10 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white font-bold text-lg"
                    >
                      {num}
                    </RCUButton>
                  ))}
                  <RCUButton className="w-full h-10 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs font-semibold">
                    GUIDE
                  </RCUButton>
                  <RCUButton className="w-full h-10 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white font-bold text-lg">
                    0
                  </RCUButton>
                  <RCUButton className="w-full h-10 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs font-semibold">
                    INFO
                  </RCUButton>
                </div>

                {/* Navigation Circle */}
                <div className="relative w-40 h-40 mx-auto mb-4">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-600 to-gray-800 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-700 to-gray-900 relative overflow-hidden">
                      {/* Up */}
                      <RCUButton className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-gray-300 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4l-8 8h16z"/>
                        </svg>
                      </RCUButton>
                      {/* Down */}
                      <RCUButton className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-gray-300 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 20l8-8H4z"/>
                        </svg>
                      </RCUButton>
                      {/* Left */}
                      <RCUButton className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-300 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 12l8 8V4z"/>
                        </svg>
                      </RCUButton>
                      {/* Right */}
                      <RCUButton className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-300 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 12l-8-8v16z"/>
                        </svg>
                      </RCUButton>
                    </div>
                  </div>
                  {/* OK Button Center */}
                  <div className="absolute inset-[35%] rounded-full">
                    <RCUButton className="w-full h-full rounded-full bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold text-sm shadow-lg ring-2 ring-blue-900/50">
                      OK
                    </RCUButton>
                  </div>
                </div>

                {/* Menu Row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-[10px] font-semibold">
                    MENU
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-[10px] font-semibold">
                    HOME
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-[10px] font-semibold">
                    BACK
                  </RCUButton>
                </div>

                {/* Volume & Channel Controls */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="space-y-1">
                    <RCUButton className="w-full py-2 rounded-t-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-xs font-semibold">
                      VOL +
                    </RCUButton>
                    <RCUButton className="w-full py-2 rounded-b-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs font-semibold">
                      VOL −
                    </RCUButton>
                  </div>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-orange-600 to-orange-700 text-white text-[10px] font-semibold h-full">
                    MUTE
                  </RCUButton>
                  <div className="space-y-1">
                    <RCUButton className="w-full py-2 rounded-t-lg bg-gradient-to-b from-gray-600 to-gray-700 text-white text-xs font-semibold">
                      CH +
                    </RCUButton>
                    <RCUButton className="w-full py-2 rounded-b-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs font-semibold">
                      CH −
                    </RCUButton>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="grid grid-cols-5 gap-1 mb-4">
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs">
                    ⏮
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs">
                    ◀◀
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-green-600 to-green-700 text-white text-xs">
                    ▶
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs">
                    ▶▶
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs">
                    ⏭
                  </RCUButton>
                </div>

                {/* Stop/Pause/Record */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs">
                    ⏹
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white text-xs">
                    ⏸
                  </RCUButton>
                  <RCUButton className="py-2 rounded-lg bg-gradient-to-b from-red-600 to-red-700 text-white text-xs">
                    ⏺
                  </RCUButton>
                </div>

                {/* Color Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <RCUButton className="h-6 rounded-md bg-gradient-to-b from-red-500 to-red-700"><span></span></RCUButton>
                  <RCUButton className="h-6 rounded-md bg-gradient-to-b from-green-500 to-green-700"><span></span></RCUButton>
                  <RCUButton className="h-6 rounded-md bg-gradient-to-b from-yellow-400 to-yellow-600"><span></span></RCUButton>
                  <RCUButton className="h-6 rounded-md bg-gradient-to-b from-blue-500 to-blue-700"><span></span></RCUButton>
                </div>

                {/* RCU Footer */}
                <div className="mt-4 flex justify-center">
                  <div className="text-[8px] text-gray-500 font-medium tracking-wider">REMOTE CONTROL</div>
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
