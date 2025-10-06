import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ByChannel from "./linear-tv/ByChannel";
import ByProgram from "./linear-tv/ByProgram";
import OnlineContent from "./linear-tv/OnlineContent";

const LinearTVStatistics = () => {
  return (
    <Tabs defaultValue="channel" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="channel">By Channel</TabsTrigger>
        <TabsTrigger value="program">By Program</TabsTrigger>
        <TabsTrigger value="online">Online Content</TabsTrigger>
      </TabsList>
      
      <TabsContent value="channel" className="mt-6">
        <ByChannel />
      </TabsContent>
      
      <TabsContent value="program" className="mt-6">
        <ByProgram />
      </TabsContent>
      
      <TabsContent value="online" className="mt-6">
        <OnlineContent />
      </TabsContent>
    </Tabs>
  );
};

export default LinearTVStatistics;
