import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceStatistics from "@/components/statistics/ResourceStatistics";
import LinearTVStatistics from "@/components/statistics/LinearTVStatistics";
import DeviceActionHistory from "@/components/statistics/DeviceActionHistory";

const Statistics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-muted-foreground">Detailed analytics and device statistics</p>
      </div>

      <Tabs defaultValue="resource" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resource">Resource Statistics</TabsTrigger>
          <TabsTrigger value="linear-tv">Linear TV Statistics</TabsTrigger>
          <TabsTrigger value="device-history">Device Action History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resource" className="mt-6">
          <ResourceStatistics />
        </TabsContent>
        
        <TabsContent value="linear-tv" className="mt-6">
          <LinearTVStatistics />
        </TabsContent>
        
        <TabsContent value="device-history" className="mt-6">
          <DeviceActionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
