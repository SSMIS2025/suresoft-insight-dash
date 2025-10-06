import { useState } from "react";
import { Download, Server, CheckCircle, XCircle, AlertCircle, Wifi, Box, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import DevicesByLocation from "@/components/DevicesByLocation";
import ActivationChart from "@/components/ActivationChart";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  
  const stats = [
    { title: "Total Devices", value: "1,234", icon: Server, gradient: "gradient-primary" },
    { title: "Online Devices", value: "987", icon: CheckCircle, gradient: "gradient-success" },
    { title: "Never Connected", value: "42", icon: XCircle, gradient: "gradient-danger" },
    { title: "Offline Devices", value: "205", icon: Wifi, gradient: "gradient-warning" },
    { title: "Unregistered", value: "78", icon: AlertCircle, gradient: "gradient-info" },
    { title: "Models", value: "12", icon: Box, gradient: "gradient-primary" },
    { title: "Users", value: "156", icon: Users, gradient: "gradient-success" },
  ];

  const exportToExcel = () => {
    const data = stats.map(stat => ({
      Category: stat.title,
      Count: stat.value
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dashboard Statistics");
    XLSX.writeFile(wb, "dashboard_statistics.xlsx");
    
    toast({
      title: "Export Successful",
      description: "Dashboard data exported to Excel",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of all devices and system statistics</p>
        </div>
        <Button onClick={exportToExcel} className="gap-2">
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
          />
        ))}
      </div>

      {/* Devices by Location */}
      <Card>
        <CardHeader>
          <CardTitle>Devices by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <DevicesByLocation />
        </CardContent>
      </Card>

      {/* Activation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Devices by Activation Date</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivationChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
