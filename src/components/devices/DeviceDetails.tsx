import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreVertical } from "lucide-react";
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

  const handleAction = (action: string) => {
    console.log(`Action: ${action} for ${stbId}`);
    // Implement action handlers
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Device Details
            </h1>
            <p className="text-muted-foreground mt-1">STB ID: {stbId}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreVertical className="h-4 w-4 mr-2" />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleAction("reboot")}>
              Reboot
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("factory-reset")}>
              Factory Reset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("block-unblock")}>
              Block/Unblock
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-primary/10 to-accent/10">
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
    </div>
  );
};

export default DeviceDetails;
