import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User from "@/components/management/User";
import Group from "@/components/management/Group";
import Device from "@/components/management/Device";
import OutsideIndiaDevice from "@/components/management/OutsideIndiaDevice";
import UnregisteredDevice from "@/components/management/UnregisteredDevice";
import Firmware from "@/components/management/Firmware";
import CMS from "@/components/management/CMS";

const Management = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage users, groups, devices, firmware, and content
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 h-auto">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="group">Group</TabsTrigger>
          <TabsTrigger value="device">Device</TabsTrigger>
          <TabsTrigger value="outside-india">Outside India</TabsTrigger>
          <TabsTrigger value="unregistered">Unregistered</TabsTrigger>
          <TabsTrigger value="firmware">Firmware</TabsTrigger>
          <TabsTrigger value="cms">CMS</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="mt-6">
          <User />
        </TabsContent>

        <TabsContent value="group" className="mt-6">
          <Group />
        </TabsContent>

        <TabsContent value="device" className="mt-6">
          <Device />
        </TabsContent>

        <TabsContent value="outside-india" className="mt-6">
          <OutsideIndiaDevice />
        </TabsContent>

        <TabsContent value="unregistered" className="mt-6">
          <UnregisteredDevice />
        </TabsContent>

        <TabsContent value="firmware" className="mt-6">
          <Firmware />
        </TabsContent>

        <TabsContent value="cms" className="mt-6">
          <CMS />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Management;
