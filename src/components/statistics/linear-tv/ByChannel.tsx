import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, TrendingUp } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

interface ChannelData {
  channelName: string;
  viewingTime: string;
  rating: number;
  tvr: number;
  shares: number;
  hits: number;
}

const ByChannel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("Star Plus");

  const channelData: ChannelData[] = [
    { channelName: "Star Plus", viewingTime: "145:30:00", rating: 8.5, tvr: 12.5, shares: 15.2, hits: 45000 },
    { channelName: "Colors TV", viewingTime: "132:15:00", rating: 7.8, tvr: 11.2, shares: 13.8, hits: 42000 },
    { channelName: "Sony TV", viewingTime: "128:45:00", rating: 7.5, tvr: 10.8, shares: 13.2, hits: 40000 },
    { channelName: "Zee TV", viewingTime: "120:20:00", rating: 7.2, tvr: 10.2, shares: 12.5, hits: 38000 },
    { channelName: "Star Vijay", viewingTime: "115:10:00", rating: 6.9, tvr: 9.8, shares: 11.8, hits: 35000 },
  ];

  const filteredData = channelData.filter((channel) =>
    channel.channelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top10ChartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 8 } },
    dataLabels: { enabled: false },
    colors: ["#6366f1", "#8b5cf6"],
    xaxis: { categories: channelData.map((c) => c.channelName) },
  };

  const top10Series = [
    { name: "Rating", data: channelData.map((c) => c.rating) },
    { name: "Shares", data: channelData.map((c) => c.shares) },
  ];

  const timelineOptions: ApexOptions = {
    chart: { type: "area", stacked: true, toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#6366f1", "#8b5cf6"],
    xaxis: {
      categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    },
    fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.2 } },
  };

  const timelineSeries = [
    { name: "Rating", data: [3.5, 2.8, 5.2, 7.8, 6.5, 8.5, 4.2] },
    { name: "Shares", data: [8.2, 6.5, 10.5, 15.2, 13.8, 18.5, 9.8] },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Channel Statistics");
    XLSX.writeFile(wb, "channel_statistics.xlsx");
    
    toast({
      title: "Export Successful",
      description: "Channel statistics exported to Excel",
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="gradient-primary text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Viewing Set-top Boxes</p>
                <p className="text-3xl font-bold mt-1">12,450</p>
              </div>
              <TrendingUp className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-success text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Viewing Time</p>
                <p className="text-3xl font-bold mt-1">642:00:00</p>
              </div>
              <TrendingUp className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Channel Statistics</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={exportToExcel}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Channel Name</th>
                  <th className="text-left p-3 font-semibold">Viewing Time</th>
                  <th className="text-left p-3 font-semibold">Rating</th>
                  <th className="text-left p-3 font-semibold">TVR</th>
                  <th className="text-left p-3 font-semibold">Shares</th>
                  <th className="text-left p-3 font-semibold">Hits</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((channel, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{channel.channelName}</td>
                    <td className="p-3">{channel.viewingTime}</td>
                    <td className="p-3">{channel.rating}</td>
                    <td className="p-3">{channel.tvr}</td>
                    <td className="p-3">{channel.shares}</td>
                    <td className="p-3">{channel.hits.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Channels by Rating & Shares</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart options={top10ChartOptions} series={top10Series} type="bar" height={350} />
        </CardContent>
      </Card>

      {/* Single Channel Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Single Channel Analysis</CardTitle>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {channelData.map((channel) => (
                  <SelectItem key={channel.channelName} value={channel.channelName}>
                    {channel.channelName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ReactApexChart options={timelineOptions} series={timelineSeries} type="area" height={300} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ByChannel;
