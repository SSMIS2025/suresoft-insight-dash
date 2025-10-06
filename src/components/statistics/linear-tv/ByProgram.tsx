import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

interface ProgramData {
  programTitle: string;
  channelName: string;
  viewingTime: string;
  hits: number;
  rating: number;
}

const ByProgram = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("Anupamaa");

  const programData: ProgramData[] = [
    { programTitle: "Anupamaa", channelName: "Star Plus", viewingTime: "45:30:00", hits: 25000, rating: 9.2 },
    { programTitle: "Bigg Boss", channelName: "Colors TV", viewingTime: "42:15:00", hits: 23000, rating: 8.8 },
    { programTitle: "Taarak Mehta", channelName: "Sony TV", viewingTime: "40:45:00", hits: 22000, rating: 8.5 },
    { programTitle: "Yeh Rishta", channelName: "Star Plus", viewingTime: "38:20:00", hits: 21000, rating: 8.2 },
    { programTitle: "Kundali Bhagya", channelName: "Zee TV", viewingTime: "35:10:00", hits: 19000, rating: 7.9 },
  ];

  const filteredData = programData.filter(
    (program) =>
      program.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.channelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top10ChartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 8 } },
    dataLabels: { enabled: false },
    colors: ["#10b981"],
    xaxis: { categories: programData.map((p) => p.programTitle) },
  };

  const top10Series = [{ name: "Rating", data: programData.map((p) => p.rating) }];

  const timelineOptions: ApexOptions = {
    chart: { type: "area", stacked: true, toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#10b981", "#8b5cf6"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.2 } },
  };

  const timelineSeries = [
    { name: "Rating", data: [7.5, 8.2, 8.8, 9.2, 8.9, 9.5, 8.7] },
    { name: "Shares", data: [15.2, 16.5, 17.8, 18.5, 17.9, 19.2, 17.5] },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Program Statistics");
    XLSX.writeFile(wb, "program_statistics.xlsx");
    
    toast({
      title: "Export Successful",
      description: "Program statistics exported to Excel",
    });
  };

  return (
    <div className="space-y-6">
      {/* Program Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Program Statistics</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search programs..."
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
                  <th className="text-left p-3 font-semibold">Program Title</th>
                  <th className="text-left p-3 font-semibold">Channel Name</th>
                  <th className="text-left p-3 font-semibold">Viewing Time</th>
                  <th className="text-left p-3 font-semibold">Hits</th>
                  <th className="text-left p-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((program, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{program.programTitle}</td>
                    <td className="p-3">{program.channelName}</td>
                    <td className="p-3">{program.viewingTime}</td>
                    <td className="p-3">{program.hits.toLocaleString()}</td>
                    <td className="p-3">{program.rating}</td>
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
          <CardTitle>Top 10 Programs by Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart options={top10ChartOptions} series={top10Series} type="bar" height={350} />
        </CardContent>
      </Card>

      {/* Single Program Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Program Timeline Analysis</CardTitle>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                {programData.map((program) => (
                  <SelectItem key={program.programTitle} value={program.programTitle}>
                    {program.programTitle}
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

export default ByProgram;
