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
  const [compareChannel1, setCompareChannel1] = useState("Star Plus");
  const [compareChannel2, setCompareChannel2] = useState("Colors TV");

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

  // Generate time labels from 00:00 to 23:30
  const generateTimeLabels = () => {
    const labels = [];
    for (let hour = 0; hour < 24; hour++) {
      labels.push(`${hour.toString().padStart(2, '0')}:00`);
      labels.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return labels;
  };

  const timeLabels = generateTimeLabels();

  // Wave chart for viewing set-top boxes timeline
  const viewingTimelineOptions: ApexOptions = {
    chart: { type: "area", stacked: true, toolbar: { show: true } },
    dataLabels: { enabled: false },
    colors: ["hsl(var(--chart-1))"],
    stroke: { curve: "smooth", width: 2 },
    xaxis: { 
      categories: timeLabels,
      labels: { rotate: -45, rotateAlways: false }
    },
    yaxis: { title: { text: "Viewing Set-top Boxes" } },
    fill: { 
      type: "gradient", 
      gradient: { opacityFrom: 0.6, opacityTo: 0.2 } 
    },
    tooltip: { x: { format: 'HH:mm' } }
  };

  const generateRandomViewingData = () => {
    return timeLabels.map((_, index) => {
      const hour = Math.floor(index / 2);
      if (hour >= 6 && hour <= 10) return Math.floor(Math.random() * 3000) + 5000;
      if (hour >= 18 && hour <= 23) return Math.floor(Math.random() * 5000) + 7000;
      return Math.floor(Math.random() * 2000) + 2000;
    });
  };

  const viewingTimelineSeries = [
    { name: "Viewing Set-top Boxes", data: generateRandomViewingData() }
  ];

  // Single channel bar chart
  const singleChannelOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, borderRadius: 8, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    colors: ["hsl(var(--chart-1))", "hsl(var(--chart-2))"],
    xaxis: { categories: ["Rating", "Shares"] },
    yaxis: { title: { text: "Values" } }
  };

  const selectedChannelData = channelData.find(c => c.channelName === selectedChannel);
  const singleChannelSeries = [{
    name: selectedChannel,
    data: [selectedChannelData?.rating || 0, selectedChannelData?.shares || 0]
  }];

  // Compare channels bar chart
  const compareBarOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, borderRadius: 8 } },
    dataLabels: { enabled: false },
    colors: ["hsl(var(--chart-3))", "hsl(var(--chart-4))"],
    xaxis: { categories: ["Rating", "Shares"] }
  };

  const channel1Data = channelData.find(c => c.channelName === compareChannel1);
  const channel2Data = channelData.find(c => c.channelName === compareChannel2);

  const compareBarSeries = [
    { name: compareChannel1, data: [channel1Data?.rating || 0, channel1Data?.shares || 0] },
    { name: compareChannel2, data: [channel2Data?.rating || 0, channel2Data?.shares || 0] }
  ];

  // Compare channels timeline
  const compareTimelineOptions: ApexOptions = {
    chart: { type: "area", stacked: false, toolbar: { show: true } },
    dataLabels: { enabled: false },
    colors: ["hsl(var(--chart-3))", "hsl(var(--chart-4))"],
    stroke: { curve: "smooth", width: 2 },
    xaxis: { 
      categories: timeLabels,
      labels: { rotate: -45 }
    },
    fill: { 
      type: "gradient", 
      gradient: { opacityFrom: 0.6, opacityTo: 0.2 } 
    }
  };

  const compareTimelineSeries = [
    { name: compareChannel1, data: generateRandomViewingData() },
    { name: compareChannel2, data: generateRandomViewingData() }
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

      {/* Viewing Timeline Wave Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline of Viewing Set-top Boxes</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart 
            options={viewingTimelineOptions} 
            series={viewingTimelineSeries} 
            type="area" 
            height={350} 
          />
        </CardContent>
      </Card>

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

      {/* Top 10 Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Channels by Rating & Shares</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart 
            options={{
              chart: { type: "bar", toolbar: { show: false } },
              plotOptions: { bar: { horizontal: true, borderRadius: 8 } },
              dataLabels: { enabled: false },
              colors: ["hsl(var(--chart-1))", "hsl(var(--chart-2))"],
              xaxis: { categories: channelData.map((c) => c.channelName) }
            }}
            series={[
              { name: "Rating", data: channelData.map((c) => c.rating) },
              { name: "Shares", data: channelData.map((c) => c.shares) }
            ]} 
            type="bar" 
            height={350} 
          />
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
          <ReactApexChart 
            options={singleChannelOptions} 
            series={singleChannelSeries} 
            type="bar" 
            height={300} 
          />
        </CardContent>
      </Card>

      {/* Compare Channels Bar Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Compare Channels</CardTitle>
            <div className="flex gap-2">
              <Select value={compareChannel1} onValueChange={setCompareChannel1}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channelData.map((channel) => (
                    <SelectItem key={channel.channelName} value={channel.channelName}>
                      {channel.channelName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="self-center">vs</span>
              <Select value={compareChannel2} onValueChange={setCompareChannel2}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
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
          </div>
        </CardHeader>
        <CardContent>
          <ReactApexChart 
            options={compareBarOptions} 
            series={compareBarSeries} 
            type="bar" 
            height={300} 
          />
        </CardContent>
      </Card>

      {/* Compare Channels Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Compare Channels Timeline (00:00 - 23:30)</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart 
            options={compareTimelineOptions} 
            series={compareTimelineSeries} 
            type="area" 
            height={350} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ByChannel;
