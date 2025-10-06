import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

interface OnlineContentData {
  contentTitle: string;
  session: number;
  episode: string;
  viewingTime: string;
  hits: number;
  rating: number;
}

const OnlineContent = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const contentData: OnlineContentData[] = [
    { contentTitle: "Breaking Bad", session: 5, episode: "E14", viewingTime: "52:30:00", hits: 18000, rating: 9.5 },
    { contentTitle: "Stranger Things", session: 4, episode: "E9", viewingTime: "48:15:00", hits: 17500, rating: 9.2 },
    { contentTitle: "The Crown", session: 6, episode: "E10", viewingTime: "45:45:00", hits: 16800, rating: 8.9 },
    { contentTitle: "Squid Game", session: 1, episode: "E9", viewingTime: "42:20:00", hits: 16200, rating: 8.7 },
    { contentTitle: "Money Heist", session: 5, episode: "E10", viewingTime: "40:10:00", hits: 15500, rating: 8.5 },
  ];

  const filteredData = contentData.filter((content) =>
    content.contentTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top10ChartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 8 } },
    dataLabels: { enabled: false },
    colors: ["#0ea5e9", "#8b5cf6"],
    xaxis: { categories: contentData.map((c) => c.contentTitle) },
  };

  const top10Series = [
    { name: "Rating", data: contentData.map((c) => c.rating) },
    { name: "Shares", data: contentData.map((c) => c.rating * 1.8) }
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Online Content");
    XLSX.writeFile(wb, "online_content_statistics.xlsx");
    
    toast({
      title: "Export Successful",
      description: "Online content statistics exported to Excel",
    });
  };

  return (
    <div className="space-y-6">
      {/* Content Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Online Content Viewed</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
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
                  <th className="text-left p-3 font-semibold">Content Title</th>
                  <th className="text-left p-3 font-semibold">Session</th>
                  <th className="text-left p-3 font-semibold">Episode</th>
                  <th className="text-left p-3 font-semibold">Viewing Time</th>
                  <th className="text-left p-3 font-semibold">Hits</th>
                  <th className="text-left p-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((content, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{content.contentTitle}</td>
                    <td className="p-3">Season {content.session}</td>
                    <td className="p-3">{content.episode}</td>
                    <td className="p-3">{content.viewingTime}</td>
                    <td className="p-3">{content.hits.toLocaleString()}</td>
                    <td className="p-3">{content.rating}</td>
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
          <CardTitle>Top 10 Online Content by Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart options={top10ChartOptions} series={top10Series} type="bar" height={350} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OnlineContent;
