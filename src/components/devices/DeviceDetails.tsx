import { useState } from "react";
import { ArrowLeft, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DeviceGeneral from "./details/DeviceGeneral";
import DeviceDiagnostics from "./details/DeviceDiagnostics";
import DeviceAVManagement from "./details/DeviceAVManagement";
import DeviceHistory from "./details/DeviceHistory";

interface DeviceDetailsProps {
  stbId: string;
  onBack: () => void;
}

const DeviceDetails = ({ stbId, onBack }: DeviceDetailsProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [lnbDialogOpen, setLnbDialogOpen] = useState(false);
  const [channelScanDialogOpen, setChannelScanDialogOpen] = useState(false);
  const [firmwareDialogOpen, setFirmwareDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [lnbType, setLnbType] = useState("");
  const [userBased, setUserBased] = useState("");
  const [targetVersion, setTargetVersion] = useState("");
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case "lnb-setting":
        setLnbDialogOpen(true);
        break;
      case "channel-scan":
        setChannelScanDialogOpen(true);
        break;
      case "pin-reset":
        toast({
          title: "Pin Reset Started",
          description: "The pin reset process has been initiated.",
        });
        break;
      case "firmware-update":
        setFirmwareDialogOpen(true);
        break;
      case "block":
        setBlockDialogOpen(true);
        break;
      case "reboot":
        toast({
          title: "Reboot Initiated",
          description: `Device ${stbId} is rebooting.`,
        });
        break;
      case "factory-reset":
        toast({
          title: "Factory Reset Initiated",
          description: `Device ${stbId} factory reset has been started.`,
        });
        break;
      default:
        console.log(`Action ${action} triggered for device ${stbId}`);
    }
  };

  const handleLnbSubmit = () => {
    toast({
      title: "LNB Settings Updated",
      description: "LNB settings have been successfully updated.",
    });
    setLnbDialogOpen(false);
  };

  const handleChannelScan = () => {
    toast({
      title: "Channel Scan Started",
      description: "Channel scanning is now in progress.",
    });
    setChannelScanDialogOpen(false);
  };

  const handleFirmwareUpdate = () => {
    toast({
      title: "Firmware Update Scheduled",
      description: `Firmware update to version ${targetVersion} has been scheduled.`,
    });
    setFirmwareDialogOpen(false);
  };

  const handleBlock = () => {
    toast({
      title: "Device Blocked",
      description: "The device has been successfully blocked.",
    });
    setBlockDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Device Details</h2>
            <p className="text-sm text-muted-foreground">STB ID: {stbId}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreVertical className="h-4 w-4 mr-2" />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleAction("reboot")}>
              Reboot
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("factory-reset")}>
              Factory Reset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("block")}>
              Block/UnBlock
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("firmware-update")}>
              Firmware Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("pin-reset")}>
              Pin Reset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("channel-scan")}>
              Channel Scan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("lnb-setting")}>
              LNB Setting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="av-management">AV Management</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <DeviceGeneral stbId={stbId} />
        </TabsContent>
        <TabsContent value="diagnostics" className="mt-6">
          <DeviceDiagnostics stbId={stbId} />
        </TabsContent>
        <TabsContent value="av-management" className="mt-6">
          <DeviceAVManagement stbId={stbId} />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <DeviceHistory stbId={stbId} />
        </TabsContent>
      </Tabs>

      {/* LNB Settings Dialog */}
      <Dialog open={lnbDialogOpen} onOpenChange={setLnbDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              LNB Settings
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLnbDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lnb-type">LNB Type</Label>
              <Select value={lnbType} onValueChange={setLnbType}>
                <SelectTrigger id="lnb-type">
                  <SelectValue placeholder="Select LNB Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="universal">Universal</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="c-band">C-Band</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-based">User Based</Label>
              <Select value={userBased} onValueChange={setUserBased}>
                <SelectTrigger id="user-based">
                  <SelectValue placeholder="Select User Based" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLnbDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLnbSubmit}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Channel Scan Dialog */}
      <Dialog open={channelScanDialogOpen} onOpenChange={setChannelScanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Channel Scan
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChannelScanDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="py-4">
            Do you really want to Channel Scan?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChannelScanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChannelScan}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Firmware Update Dialog */}
      <Dialog open={firmwareDialogOpen} onOpenChange={setFirmwareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Firmware Update
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFirmwareDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" value="STB-X1000" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-version">Target Version</Label>
              <Select value={targetVersion} onValueChange={setTargetVersion}>
                <SelectTrigger id="target-version">
                  <SelectValue placeholder="Select Target Version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v2.5.1">v2.5.1</SelectItem>
                  <SelectItem value="v2.5.0">v2.5.0</SelectItem>
                  <SelectItem value="v2.4.8">v2.4.8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Devices</Label>
              <p className="text-sm text-muted-foreground">Selected: 1</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFirmwareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFirmwareUpdate}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block/UnBlock Dialog */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Block
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBlockDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="py-4">
            Are you sure you want to block this device? This will block the screen of the display device connected to this device.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlock}>Block</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceDetails;
